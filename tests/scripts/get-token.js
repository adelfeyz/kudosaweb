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

async function getToken() {
  try {
    console.log('🔐 Getting authentication token...');
    
    const response = await makeRequest('https://unified-api.adel-feiz.workers.dev/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'aidra2024'
      }
    });

    console.log('Login response:', response.status, response.body);
    
    if (response.status === 200 && response.body.token) {
      console.log('✅ Token obtained successfully');
      console.log('Token:', response.body.token);
      
      // Test the token with admin/users endpoint
      console.log('\n🧪 Testing token with admin/users endpoint...');
      
      const usersResponse = await makeRequest('https://unified-api.adel-feiz.workers.dev/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${response.body.token}`
        }
      });

      console.log('Users response:', usersResponse.status, usersResponse.body);
      
      if (usersResponse.status === 200) {
        console.log('✅ Admin users endpoint working correctly');
        console.log('Users found:', usersResponse.body.users ? usersResponse.body.users.length : 0);
      } else {
        console.log('❌ Admin users endpoint failed:', usersResponse.body);
      }
      
    } else {
      console.log('❌ Failed to get token:', response.body);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getToken();
