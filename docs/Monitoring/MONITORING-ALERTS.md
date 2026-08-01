# API Monitoring and Alerts Configuration

## 🚨 Alert Thresholds

### **Critical Alerts (Immediate Action Required)**

#### **1. API Key Abuse**
- **Trigger**: > 1000 requests/hour from single API key
- **Action**: Auto-revoke API key, notify admin
- **Recovery**: Manual review and key regeneration

#### **2. Database Connection Failure**
- **Trigger**: Database queries failing for > 5 minutes
- **Action**: Alert admin, check D1 status
- **Recovery**: Automatic retry, manual intervention if needed

#### **3. KV Storage Failure**
- **Trigger**: KV operations failing for > 2 minutes
- **Action**: Alert admin, check KV namespace status
- **Recovery**: Automatic retry, manual intervention if needed

#### **4. High Error Rate**
- **Trigger**: > 50% error rate for any API key in 1 hour
- **Action**: Alert admin, investigate API key usage
- **Recovery**: Review API key permissions, check external service

### **Warning Alerts (Monitor Closely)**

#### **1. Rate Limit Approaching**
- **Trigger**: > 80% of rate limit used in 1 hour
- **Action**: Notify admin, monitor usage patterns
- **Recovery**: Consider increasing rate limit if legitimate

#### **2. High Response Time**
- **Trigger**: Average response time > 2 seconds for 10 minutes
- **Action**: Alert admin, check system performance
- **Recovery**: Optimize queries, check Cloudflare status

#### **3. Unusual Activity Pattern**
- **Trigger**: 3x normal request volume from single API key
- **Action**: Alert admin, investigate usage
- **Recovery**: Review external service integration

#### **4. Failed Authentication Spikes**
- **Trigger**: > 100 failed auth attempts in 1 hour
- **Action**: Alert admin, check for brute force attempts
- **Recovery**: Review API key security, consider IP restrictions

### **Info Alerts (Log for Analysis)**

#### **1. New API Key Usage**
- **Trigger**: First request from new API key
- **Action**: Log activity, notify admin
- **Recovery**: N/A (normal operation)

#### **2. Zero Activity**
- **Trigger**: No requests for 24 hours from active API key
- **Action**: Log for analysis, check external service status
- **Recovery**: Contact external service if needed

## 📊 Monitoring Dashboard

### **Real-time Metrics**

#### **API Usage Overview**
- Total requests (last 24h)
- Successful requests (last 24h)
- Error rate (last 24h)
- Average response time
- Active API keys

#### **Per-API-Key Metrics**
- Request count (last 24h)
- Rate limit usage (%)
- Last request time
- Error count
- Average response time

#### **System Health**
- Database connection status
- KV storage status
- Worker uptime
- Response time trends

### **Historical Analysis**

#### **Usage Trends**
- Requests per hour (last 7 days)
- Error rate trends (last 7 days)
- Response time trends (last 7 days)
- Peak usage hours

#### **API Key Performance**
- Top performing API keys
- Most error-prone API keys
- Rate limit utilization
- Usage patterns by hour/day

## 🔧 Alert Implementation

### **Cloudflare Workers Monitoring**

#### **1. Built-in Metrics**
```javascript
// Add to api-worker/index.ts
export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const startTime = Date.now();
    
    try {
      // ... existing code ...
      
      // Log performance metrics
      const responseTime = Date.now() - startTime;
      await logPerformanceMetrics(request, responseTime, env);
      
    } catch (error) {
      // Log error metrics
      await logErrorMetrics(request, error, env);
    }
  }
};
```

#### **2. Custom Metrics Collection**
```javascript
async function logPerformanceMetrics(request: Request, responseTime: number, env: Env) {
  const url = new URL(request.url);
  const endpoint = url.pathname;
  const method = request.method;
  
  // Store in D1 for analysis
  await env.DB.prepare(`
    INSERT INTO api_performance_log (endpoint, method, response_time_ms, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `).bind(endpoint, method, responseTime).run();
}
```

### **External Monitoring Services**

#### **1. Uptime Monitoring**
- **Service**: UptimeRobot or Pingdom
- **URLs**: 
  - `https://unified-api.adel-feiz.workers.dev/api/external/blog/posts`
  - `https://unified-api.adel-feiz.workers.dev/api/health`
- **Frequency**: Every 5 minutes
- **Alert**: Email/SMS if down for > 2 minutes

#### **2. Performance Monitoring**
- **Service**: New Relic or DataDog
- **Metrics**: Response time, error rate, throughput
- **Alerts**: Performance degradation notifications

#### **3. Log Analysis**
- **Service**: Cloudflare Analytics or external log aggregator
- **Focus**: Error patterns, usage trends, security events
- **Alerts**: Unusual activity, error spikes

## 📱 Notification Channels

### **Email Alerts**
- **Critical**: Immediate email to admin
- **Warning**: Daily digest
- **Info**: Weekly summary

### **SMS Alerts**
- **Critical**: Immediate SMS for system down
- **Warning**: SMS for rate limit abuse

### **Slack/Discord Integration**
- **Real-time**: All alerts to dedicated channel
- **Filtering**: Critical alerts only
- **Escalation**: @admin for critical issues

## 🎯 Monitoring Endpoints

### **Health Check**
```
GET /api/health
```
Returns system health status and service latencies.

### **Usage Statistics**
```
GET /api/admin/usage-stats
```
Returns API usage statistics (requires admin authentication).

### **Recent Activity**
```
GET /api/admin/activity?limit=50&hours=24
```
Returns recent API activity for monitoring.

### **Error Summary**
```
GET /api/admin/errors?hours=24
```
Returns error summary and patterns.

### **Rate Limit Status**
```
GET /api/admin/rate-limits?hours=1
```
Returns current rate limit usage for all API keys.

## 🔍 Troubleshooting Guide

### **Common Issues**

#### **1. High Error Rate**
- Check API key validity
- Verify request format
- Check rate limits
- Review external service integration

#### **2. Slow Response Times**
- Check database query performance
- Verify KV storage latency
- Review Cloudflare status
- Check worker memory usage

#### **3. Rate Limit Issues**
- Verify rate limit configuration
- Check for API key abuse
- Review usage patterns
- Consider increasing limits if legitimate

#### **4. Authentication Failures**
- Verify API key format
- Check key activation status
- Review hash generation
- Verify KV storage

### **Recovery Procedures**

#### **1. API Key Revocation**
```bash
# Revoke compromised API key
wrangler kv key delete --binding BLOG_API_KEYS --remote "key-hash"
wrangler d1 execute --remote --command "UPDATE api_keys_metadata SET is_active = 0 WHERE api_key_hash = 'key-hash'"
```

#### **2. Rate Limit Reset**
```bash
# Reset rate limit for specific key
wrangler d1 execute --remote --command "UPDATE api_keys_metadata SET rate_limit_per_hour = 1000 WHERE id = key-id"
```

#### **3. Emergency Shutdown**
```bash
# Disable all external API keys
wrangler d1 execute --remote --command "UPDATE api_keys_metadata SET is_active = 0 WHERE is_active = 1"
```

## 📈 Performance Optimization

### **Database Optimization**
- Index frequently queried columns
- Optimize audit log queries
- Implement query result caching
- Regular cleanup of old logs

### **KV Storage Optimization**
- Cache frequently accessed data
- Implement TTL for temporary data
- Monitor KV usage and costs
- Optimize key naming strategy

### **Worker Optimization**
- Minimize cold start time
- Optimize bundle size
- Implement efficient error handling
- Use streaming responses for large data

## 🎯 Success Metrics

### **Availability**
- Target: 99.9% uptime
- Measurement: Health check endpoint
- Alert: < 99% uptime

### **Performance**
- Target: < 500ms average response time
- Measurement: Response time logs
- Alert: > 2s average response time

### **Security**
- Target: 0 unauthorized access
- Measurement: Failed authentication logs
- Alert: > 10 failed attempts per hour

### **Usage**
- Target: Healthy growth
- Measurement: Request volume trends
- Alert: Unusual spikes or drops
