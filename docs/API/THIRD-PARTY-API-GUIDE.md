# Pointer Blog API - Third Party Integration Guide

## Overview

This API allows third-party services to create and manage draft blog posts for the Pointer website. All posts are automatically assigned to Dr. Samaneh Daftarian and remain in draft status until manually published by the admin team.

## Getting Started

### 1. Obtain Your API Key

Contact the Pointer team to request an API key for your integration.

### 2. Import Postman Collection

1. Download the `Third-Party-Blog-API.postman_collection.json` file
2. Import it into Postman
3. Update the `apiKey` variable with your provided API key
4. Start testing!

### 3. Base URL

```
https://unified-api.adel-feiz.workers.dev/api/external/blog
```

## Authentication

Include your API key in the `X-API-Key` header for all requests:

```
X-API-Key: your-api-key-here
```

## Rate Limits

- **100 requests per hour** per API key
- Rate limit exceeded returns HTTP 429
- Contact support if you need higher limits

## Available Endpoints

### Posts Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all draft posts |
| GET | `/posts/{id}` | Get single draft post |
| POST | `/posts` | Create new draft post |
| PUT | `/posts/{id}` | Update existing draft post |

### Reference Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get available categories |
| GET | `/tags` | Get available tags |
| GET | `/authors` | Get default author info |

## Creating a Blog Post

### Required Fields

- `title` - Post title
- `slug` - URL-friendly slug (must be unique)
- `content` - TipTap JSON format content

### Optional Fields

- `excerpt` - Short description
- `featured_image_url` - Image URL
- `seo_title` - SEO page title
- `seo_description` - Meta description
- `meta_keywords` - Comma-separated keywords
- `category_ids` - Array of category IDs
- `tag_ids` - Array of tag IDs

### Example Request

```json
{
  "title": "New Dental Treatment Options",
  "slug": "new-dental-treatment-options",
  "excerpt": "Discover our latest dental treatment options.",
  "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Your content here.\"}]}]}",
  "category_ids": [1, 3],
  "tag_ids": [5, 8]
}
```

## Content Format (TipTap JSON)

The `content` field must be valid TipTap JSON. Here are examples:

### Simple Text
```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Your paragraph text here."
        }
      ]
    }
  ]
}
```

### Rich Content with Formatting
```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {"level": 1},
      "content": [
        {
          "type": "text",
          "text": "Main Heading"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is "
        },
        {
          "type": "text",
          "marks": [{"type": "bold"}],
          "text": "bold text"
        },
        {
          "type": "text",
          "text": " and "
        },
        {
          "type": "text",
          "marks": [{"type": "italic"}],
          "text": "italic text"
        }
      ]
    }
  ]
}
```

## Important Restrictions

1. **Draft Only**: You can only create and edit draft posts
2. **Author Override**: All posts are assigned to Dr. Samaneh Daftarian
3. **Status Override**: All posts remain in 'draft' status
4. **No Published Access**: You cannot view or edit published posts

## Error Responses

| Status | Error | Description |
|--------|-------|-------------|
| 401 | Invalid API key | Check your API key |
| 403 | Access denied | Trying to access published content |
| 404 | Not found | Post doesn't exist or not accessible |
| 429 | Rate limit exceeded | Too many requests |
| 422 | Validation error | Invalid request data |

## Support

For technical support or questions about the API, contact the Pointer development team.

## Security

- API keys are secure and should not be shared
- All requests are logged for audit purposes
- Rate limiting prevents abuse
- CORS is configured for secure cross-origin requests
