# iCreate Smiles Website - Deployment Guide

## Overview
This document contains all the deployment information for the iCreate Smiles website, including hosting details, GitHub repository information, and database configuration.

## GitHub Repository
- **Repository URL**: https://github.com/adelfeyz/icreatesmiles-website.git
- **Branch**: main
- **Repository Owner**: adelfeyz
- **Repository Name**: icreatesmiles-website

## Hosting Information
### Cloudflare Pages Configuration
- **Project Name**: icreatesmiles-website
- **Domain**: icreatesmiles.care
- **Build Command**: `npx @opennextjs/cloudflare build`
- **Build Output**: `.open-next/worker.js`
- **Root Directory**: (default)
- **Production Branch**: main
- **Automatic Deployments**: Enabled
- **Build System Version**: Version 3
- **Compatibility Date**: May 16, 2025
- **Compatibility Flags**: nodejs_compat
- **Placement**: Default
- **Fail Open/Closed**: Fail open

### Environment Variables
| Type | Name | Value |
|------|------|-------|
| Plaintext | DEFAULT_SITE | icreatesmiles |
| Plaintext | NEXT_PUBLIC_API_BASE_URL | https://unified-api.adel-feiz.workers.dev |
| Plaintext | SITE_DOMAIN | icreatesmiles.care |
| Plaintext | SITE_NAME | iCreate Smiles |

## Database Information
- **Database Type**: Cloudflare D1 Database
- **Database ID**: cbabf96f-7269-4ba6-b997-3e5795484ea2
- **Database Name**: icreatesmiles-database

## Build Configuration
- **Build Comments**: Enabled
- **Build Cache**: Disabled
- **Build Watch Paths**: Include all paths (*)
- **Deploy Hooks**: None defined

## Local Development
- **Framework**: Next.js 15.3.5
- **Package Manager**: npm
- **Node Version**: 22.12.0
- **Development Server**: `npm run dev`
- **Local URL**: http://localhost:3000

## Deployment Process
1. Code is pushed to the `main` branch on GitHub
2. Cloudflare Pages automatically detects changes
3. Build process runs using `npx @cloudflare/next-on-pages@1`
4. Static files are generated in `.vercel/output/static`
5. Site is deployed to icreatesmiles.care

## Access Control
- **Access Policy**: Control access to preview deployments with Cloudflare Access
- **Notifications**: Subscribe to specific events by adding notifications to the project

## Project Management
- **Notifications**: Configured for deployment events
- **Access Policy**: Cloudflare Access integration available
- **Project Deletion**: Can permanently delete the Pages project including all deployments, assets, functions and configurations

## API Integration
- **API Base URL**: https://unified-api.adel-feiz.workers.dev
- **Database Binding**: D1 Database (icreatesmiles-database)

## Troubleshooting
- Check Cloudflare Pages dashboard for build logs
- Verify environment variables are set correctly
- Ensure GitHub repository has proper permissions
- Monitor D1 database for connection issues

---
*Last Updated: January 3, 2025*
