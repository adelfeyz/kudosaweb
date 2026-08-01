# Cloudflare Migration Checklist - Pointer

Use this checklist to track your migration progress.

## Pre-Migration

- [ ] New Cloudflare account access confirmed
- [ ] All API keys and secrets ready (Brevo, OpenAI, etc.)
- [ ] Domain `pointer.ir` access confirmed
- [ ] GitHub repository access confirmed
- [ ] Wrangler CLI installed (`npm install -g wrangler`)

## Account Setup

### New Account
- [ ] Logged into new Cloudflare account
- [ ] Account ID copied: `_________________`
- [ ] Account Hash obtained (if needed): `_________________`

### Image Account (for Images)
- [ ] Image account Images credentials noted:
  - Account ID: `b2815b2dfc0adf324286f68823ba9a7c`
  - Account Hash: `OY-5RcGvVT9d-duEBIEczg`
  - Images Token: `KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL`

## D1 Database

- [ ] Database created: `pointer-database`
- [ ] Database ID copied: `_________________`
- [ ] Database location selected: `_________________`
- [ ] Schema migrated successfully
- [ ] Test query executed successfully

## KV Namespace

- [ ] KV Namespace created: `pointer-blog-api-keys`
- [ ] Namespace ID copied: `_________________`

## Cloudflare Worker

- [ ] `wrangler.toml` updated with new IDs
- [ ] Environment variables updated in `wrangler.toml`
- [ ] Worker dependencies installed (`npm install` in api-worker/)
- [ ] Wrangler logged in (`wrangler login`)
- [ ] Worker deployed successfully
- [ ] Worker URL copied: `_________________`
- [ ] Worker health check passed

## Cloudflare Pages

- [ ] Pages project created: `pointer-website`
- [ ] GitHub repository connected
- [ ] Build settings configured
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_API_BASE_URL`
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `NODE_ENV`
  - [ ] Other variables (GA4, GTM, etc.)
- [ ] D1 database binding added
- [ ] Initial deployment successful
- [ ] Pages URL noted: `_________________`

## Custom Domain

- [ ] Custom domain added to Pages: `pointer.ir`
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Domain accessible: `https://pointer.ir`

## Code Updates

- [ ] `api-worker/wrangler.toml` updated:
  - [ ] New account database_id
  - [ ] New account KV namespace ID
  - [ ] Image account Images credentials kept (Account ID, Hash, Token)
- [ ] `api-worker/index.ts` CORS origins updated
- [ ] `src/lib/config.ts` API URL updated
- [ ] All changes committed to Git
- [ ] Changes pushed to repository

## Final Deployment

- [ ] Worker redeployed with updated config
- [ ] Pages redeployed (auto or manual)
- [ ] Both deployments successful

## Verification

- [ ] Worker accessible at: `_________________`
- [ ] Pages site accessible at: `https://pointer.ir`
- [ ] API endpoints responding correctly
- [ ] Database queries working
- [ ] Frontend can connect to API
- [ ] No CORS errors in browser console
- [ ] All features tested and working

## Post-Migration

- [ ] Old Cloudflare account resources noted (for cleanup)
- [ ] Documentation updated with new IDs
- [ ] Team members notified of new URLs
- [ ] Monitoring set up for new deployments

## Notes

### New Account
```
Account ID: 
Database ID: 
KV Namespace ID: 
Worker URL: 
Pages URL: 
Account Hash (if needed): 
```

### Image Account (Images)
```
Account ID: b2815b2dfc0adf324286f68823ba9a7c
Account Hash: OY-5RcGvVT9d-duEBIEczg
Images Token: KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL
```

### Issues encountered:
_________________________________________________
_________________________________________________
_________________________________________________

### Additional notes:
_________________________________________________
_________________________________________________
```

---

**Migration Date**: _______________
**Completed By**: _______________

