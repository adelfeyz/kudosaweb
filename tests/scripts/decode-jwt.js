const https = require('https');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Origin': options.origin || 'https://pointer.ir',
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: jsonData,
            rawBody: data
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: { error: 'Invalid JSON response' },
            rawBody: data
          });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }
    
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    return { header, payload };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

async function testJWT() {
  try {
    console.log('🔐 Getting authentication token...');
    
    const response = await makeRequest('https://unified-api.adel-feiz.workers.dev/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'aidra2024'
      }
    });

    if (response.status === 200 && response.body.token) {
      console.log('✅ Token obtained successfully');
      
      // Decode the JWT token
      const decoded = decodeJWT(response.body.token);
      if (decoded) {
        console.log('\n🔍 JWT Token Analysis:');
        console.log('Header:', JSON.stringify(decoded.header, null, 2));
        console.log('Payload:', JSON.stringify(decoded.payload, null, 2));
        
        // Check permissions in the payload
        if (decoded.payload.permissions) {
          console.log('\n📋 Permissions in JWT:');
          console.log(JSON.stringify(decoded.payload.permissions, null, 2));
          
          // Check if permissions have escaped quotes
          const permissionsStr = JSON.stringify(decoded.payload.permissions);
          if (permissionsStr.includes('\\')) {
            console.log('❌ Permissions contain escaped quotes - this is the problem!');
          } else {
            console.log('✅ Permissions look correct');
          }
        }
      }
      
    } else {
      console.log('❌ Failed to get token:', response.body);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testJWT();
