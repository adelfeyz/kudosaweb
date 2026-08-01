# External Blog API Documentation

## Overview

The External Blog API allows third-party services to create and manage draft blog posts for the Pointer dental practice website. This API uses API key authentication and enforces strict security measures to ensure only draft posts can be created or modified.

## Base URL

```
https://unified-api.adel-feiz.workers.dev/api/external/blog
```

## Authentication

All API requests require an API key in the `X-API-Key` header:

```http
X-API-Key: ics_live_your-api-key-here
```

### Obtaining an API Key

Contact the system administrator to request an API key. You will need to provide:
- Your organization name
- Intended use case
- Expected request volume

## Rate Limits

- **100 requests per hour** per API key
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Maximum requests per hour
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when the rate limit resets

## Security Restrictions

- **Draft Only**: External API can only create and edit posts with `status = 'draft'`
- **Author Override**: All posts are automatically assigned to Dr. Samaneh Daftarian
- **No Published Access**: Cannot view, edit, or delete published posts
- **Audit Logging**: All API usage is logged for security monitoring

## Endpoints

GET /api/external/blog/posts - List draft posts (paginated, searchable)
GET /api/external/blog/posts/{id} - Get single draft post
POST /api/external/blog/posts - Create new draft post
PUT /api/external/blog/posts/{id} - Update existing draft post
GET /api/external/blog/categories - Get all categories (no auth required)
GET /api/external/blog/tags - Get all tags (no auth required)
GET /api/external/blog/authors - Get Dr. Samaneh Daftarian info

### 1. List Draft Posts

**GET** `/api/external/blog/posts`

Retrieve a paginated list of draft blog posts.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-based) |
| `limit` | integer | 20 | Posts per page (max 100) |
| `search` | string | - | Search in title and excerpt |

#### Example Request

```http
GET /api/external/blog/posts?page=1&limit=10&search=dental
X-API-Key: ics_live_your-api-key-here
```

#### Response

```json
{
  "posts": [
    {
      "id": 123,
      "title": "Dental Care Tips",
      "slug": "dental-care-tips",
      "excerpt": "Essential tips for maintaining good oral health...",
      "content": "{\"type\":\"doc\",\"content\":[...]}",
      "author_id": 1,
      "author_name": "Dr. Samaneh Daftarian",
      "author_email": "samaneh@pointer.ir",
      "status": "draft",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "seo_title": "Dental Care Tips - Pointer",
      "seo_description": "Learn essential dental care tips...",
      "meta_keywords": "dental care, oral health, tips"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

### 2. Get Single Draft Post

**GET** `/api/external/blog/posts/{id}`

Retrieve a specific draft post by ID.

#### Example Request

```http
GET /api/external/blog/posts/123
X-API-Key: ics_live_your-api-key-here
```

#### Response

```json
{
  "post": {
    "id": 123,
    "title": "Dental Care Tips",
    "slug": "dental-care-tips",
    "excerpt": "Essential tips for maintaining good oral health...",
    "content": "{\"type\":\"doc\",\"content\":[...]}",
    "author_id": 1,
    "author_name": "Dr. Samaneh Daftarian",
    "author_email": "samaneh@pointer.ir",
    "status": "draft",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "seo_title": "Dental Care Tips - Pointer",
    "seo_description": "Learn essential dental care tips...",
    "meta_keywords": "dental care, oral health, tips"
  }
}
```

### 3. Create Draft Post

**POST** `/api/external/blog/posts`

Create a new draft blog post.

#### Request Body

```json
{
  "title": "New Dental Treatment",
  "slug": "new-dental-treatment",
  "excerpt": "Learn about our latest dental treatment options...",
  "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Your content here...\"}]}]}",
  "featured_image_url": "https://example.com/image.jpg",
  "seo_title": "New Dental Treatment - Pointer",
  "seo_description": "Discover our latest dental treatment options...",
  "meta_keywords": "dental treatment, new procedures, oral health",
  "category_ids": [1, 3],
  "tag_ids": [5, 8, 12]
}
```

#### Required Fields

- `title` (string): Post title
- `slug` (string): URL-friendly slug (must be unique)
- `content` (string): TipTap JSON content

#### Optional Fields

- `excerpt` (string): Short description
- `featured_image_url` (string): Featured image URL
- `seo_title` (string): SEO page title
- `seo_description` (string): Meta description
- `meta_keywords` (string): Comma-separated keywords
- `category_ids` (array): Array of category IDs
- `tag_ids` (array): Array of tag IDs

#### Response

```json
{
  "post": {
    "id": 124,
    "title": "New Dental Treatment",
    "slug": "new-dental-treatment",
    "excerpt": "Learn about our latest dental treatment options...",
    "content": "{\"type\":\"doc\",\"content\":[...]}",
    "author_id": 1,
    "author_name": "Dr. Samaneh Daftarian",
    "author_email": "samaneh@pointer.ir",
    "status": "draft",
    "created_at": "2024-01-15T11:00:00Z",
    "updated_at": "2024-01-15T11:00:00Z",
    "seo_title": "New Dental Treatment - Pointer",
    "seo_description": "Discover our latest dental treatment options...",
    "meta_keywords": "dental treatment, new procedures, oral health"
  }
}
```

### 4. Update Draft Post

**PUT** `/api/external/blog/posts/{id}`

Update an existing draft post. All fields are optional.

#### Request Body

```json
{
  "title": "Updated Dental Treatment",
  "excerpt": "Updated description...",
  "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Updated content...\"}]}]}",
  "category_ids": [1, 2, 3],
  "tag_ids": [5, 8]
}
```

#### Response

Returns the updated post object (same format as create response).

### 5. Get Categories

**GET** `/api/external/blog/categories`

Retrieve all available blog categories.

#### Example Request

```http
GET /api/external/blog/categories
```

#### Response

```json
{
  "categories": [
    {
      "id": 1,
      "name": "General Dentistry",
      "slug": "general-dentistry",
      "description": "Preventive care, cleanings, fillings, and routine dental treatments",
      "color": "#3B82F6",
      "icon": "fa-tooth",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Cosmetic Dentistry",
      "slug": "cosmetic-dentistry",
      "description": "Teeth whitening, veneers, crowns, and smile makeovers",
      "color": "#F59E0B",
      "icon": "fa-smile",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 6. Get Tags

**GET** `/api/external/blog/tags`

Retrieve all available blog tags.

#### Example Request

```http
GET /api/external/blog/tags
```

#### Response

```json
{
  "tags": [
    {
      "id": 1,
      "name": "Teeth Whitening",
      "slug": "teeth-whitening",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Dental Crowns",
      "slug": "dental-crowns",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 7. Get Default Author

**GET** `/api/external/blog/authors`

Retrieve information about the default author (Dr. Samaneh Daftarian).

#### Example Request

```http
GET /api/external/blog/authors
```

#### Response

```json
{
  "author": {
    "id": 1,
    "name": "Dr. Samaneh Daftarian",
    "email": "samaneh@pointer.ir",
    "bio": "Experienced dental professional...",
    "title": "Lead Dentist",
    "credentials": "DDS, Advanced Cosmetic Dentistry",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

## TipTap Content Format

The `content` field must be valid TipTap JSON. Here's the basic structure:

### Basic Paragraph

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is a paragraph of text."
        }
      ]
    }
  ]
}
```

### Heading

```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "This is a heading"
        }
      ]
    }
  ]
}
```

### Bold Text

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is ",
          "marks": []
        },
        {
          "type": "text",
          "text": "bold text",
          "marks": [
            {
              "type": "bold"
            }
          ]
        }
      ]
    }
  ]
}
```

### Bullet List

```json
{
  "type": "doc",
  "content": [
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "First item"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Second item"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Missing required fields: title, slug, content"
}
```

### 401 Unauthorized

```json
{
  "error": "Invalid API key"
}
```

### 404 Not Found

```json
{
  "error": "Post not found or not accessible"
}
```

### 429 Too Many Requests

```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Available Categories

| ID | Name | Slug | Description |
|----|------|------|-------------|
| 1 | General Dentistry | general-dentistry | Preventive care, cleanings, fillings, and routine dental treatments |
| 2 | Cosmetic Dentistry | cosmetic-dentistry | Teeth whitening, veneers, crowns, and smile makeovers |
| 3 | Dental Implants | dental-implants | Tooth replacement solutions including All-on-4 and single implants |
| 4 | Orthodontics | orthodontics | Invisalign, braces, and teeth straightening treatments |
| 5 | Oral Health & Prevention | oral-health-prevention | Dental hygiene tips, preventive care, and oral health education |
| 6 | Periodontal Care | periodontal-care | Gum disease treatment, gum grafts, and periodontal health |
| 7 | Dental Technology | dental-technology | Advanced dental technology, digital dentistry, and innovations |
| 8 | Patient Stories | patient-stories | Success stories, testimonials, and transformation journeys |

## Available Tags

| ID | Name | Slug |
|----|------|------|
| 1 | Teeth Whitening | teeth-whitening |
| 2 | Dental Crowns | dental-crowns |
| 3 | Dental Veneers | dental-veneers |
| 4 | Root Canal | root-canal |
| 5 | Tooth Extraction | tooth-extraction |
| 6 | Wisdom Teeth | wisdom-teeth |
| 7 | Gum Grafting | gum-grafting |
| 8 | Bone Grafting | bone-grafting |
| 9 | Sinus Lift | sinus-lift |
| 10 | Dental Bridges | dental-bridges |
| 11 | Dentures | dentures |
| 12 | All-on-4 | all-on-4 |
| 13 | Invisalign | invisalign |
| 14 | Braces | braces |
| 15 | Orthodontics | orthodontics |
| 16 | Dental Sealants | dental-sealants |
| 17 | Oral Cancer Screening | oral-cancer-screening |
| 18 | Pediatric Dentistry | pediatric-dentistry |
| 19 | Children Dental Care | children-dental-care |
| 20 | Teen Dentistry | teen-dentistry |
| 21 | Adult Dentistry | adult-dentistry |
| 22 | Senior Dental Care | senior-dental-care |
| 23 | Geriatric Dentistry | geriatric-dentistry |
| 24 | Cavities | cavities |
| 25 | Gum Disease | gum-disease |
| 26 | Periodontal Disease | periodontal-disease |
| 27 | Tooth Decay | tooth-decay |
| 28 | Dental Anxiety | dental-anxiety |
| 29 | TMJ Disorder | tmj-disorder |
| 30 | Bruxism | bruxism |
| 31 | Dry Mouth | dry-mouth |
| 32 | Bad Breath | bad-breath |
| 33 | Tooth Sensitivity | tooth-sensitivity |
| 34 | Dental Hygiene | dental-hygiene |
| 35 | Oral Hygiene | oral-hygiene |
| 36 | Flossing | flossing |
| 37 | Brushing | brushing |
| 38 | Mouthwash | mouthwash |
| 39 | Dental Checkup | dental-checkup |
| 40 | Preventive Care | preventive-care |
| 41 | Dental Cleaning | dental-cleaning |
| 42 | Fluoride Treatment | fluoride-treatment |
| 43 | Digital Dentistry | digital-dentistry |
| 44 | 3D Printing | 3d-printing |
| 45 | Laser Dentistry | laser-dentistry |
| 46 | Digital Impressions | digital-impressions |
| 47 | Cone Beam CT | cone-beam-ct |
| 48 | Intraoral Camera | intraoral-camera |
| 49 | Teledentistry | teledentistry |
| 50 | Diet and Dental Health | diet-and-dental-health |
| 51 | Sports Dentistry | sports-dentistry |
| 52 | Pregnancy Dental Care | pregnancy-dental-care |
| 53 | Diabetes and Dental Health | diabetes-and-dental-health |
| 54 | Smoking and Dental Health | smoking-and-dental-health |
| 55 | Dental Tourism | dental-tourism |
| 56 | Dental Emergency | dental-emergency |
| 57 | Tooth Pain | tooth-pain |
| 58 | Dental Trauma | dental-trauma |
| 59 | Broken Tooth | broken-tooth |
| 60 | Knocked Out Tooth | knocked-out-tooth |
| 61 | Dental Abscess | dental-abscess |
| 62 | Dental Insurance | dental-insurance |
| 63 | Payment Plans | payment-plans |
| 64 | Dental Financing | dental-financing |
| 65 | Insurance Coverage | insurance-coverage |
| 66 | New Year Dental Resolutions | new-year-dental-resolutions |
| 67 | Summer Dental Care | summer-dental-care |
| 68 | Back to School Dental | back-to-school-dental |
| 69 | Holiday Dental Tips | holiday-dental-tips |
| 70 | Wedding Dental Prep | wedding-dental-prep |

## Example cURL Requests

### Create a New Post

```bash
curl -X POST "https://unified-api.adel-feiz.workers.dev/api/external/blog/posts" \
  -H "X-API-Key: ics_live_your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Dental Treatment Options",
    "slug": "new-dental-treatment-options",
    "excerpt": "Discover our latest dental treatment options for better oral health.",
    "content": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Our new dental treatment options provide better results with less discomfort.\"}]}]}",
    "seo_title": "New Dental Treatment Options - Pointer",
    "seo_description": "Learn about our latest dental treatment options for improved oral health.",
    "meta_keywords": "dental treatment, new procedures, oral health",
    "category_ids": [1, 3],
    "tag_ids": [5, 8, 12]
  }'
```

### Update a Post

```bash
curl -X PUT "https://unified-api.adel-feiz.workers.dev/api/external/blog/posts/123" \
  -H "X-API-Key: ics_live_your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Dental Treatment Options",
    "excerpt": "Updated description of our dental treatment options."
  }'
```

### List Posts

```bash
curl -X GET "https://unified-api.adel-feiz.workers.dev/api/external/blog/posts?page=1&limit=10" \
  -H "X-API-Key: ics_live_your-api-key-here"
```

### Get Categories

```bash
curl -X GET "https://unified-api.adel-feiz.workers.dev/api/external/blog/categories"
```

## Support

For API support or to request additional features, contact:
- Email: admin@icreatesmiles.care
- Include your API key and detailed description of the issue
