# Document Settings Module

This module manages header and footer configurations for different document types such as invoices, receipts, contracts, policies, and reports.

## Features

- **Document Type Management**: Support for multiple document types (invoice, receipt, contract, policy, report)
- **Header Configuration**: Company logo, name, address, phone, email, website
- **Footer Configuration**: Logo, footer text, terms & conditions, signature
- **File Upload**: Upload images for logos and signatures using Cloudinary
- **Active/Inactive Status**: Toggle document settings on/off
- **Audit Logging**: Track all changes with user information
- **Notifications**: Automatic notifications for all operations

## Document Types

- `invoice` - Invoice documents
- `receipt` - Receipt documents
- `contract` - Contract documents
- `policy` - Insurance policy documents
- `report` - Report documents

## API Endpoints

### Base URL

```
/api/v1/document-settings
```

### 1. Create Document Settings

**POST** `/api/v1/document-settings`

Create new document settings for a specific document type.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

```json
{
  "documentType": "invoice",
  "companyName": "My Insurance Company",
  "companyAddress": "123 Main Street, City, Country",
  "companyPhone": "+1234567890",
  "companyEmail": "info@myinsurance.com",
  "companyWebsite": "https://myinsurance.com",
  "footerText": "Thank you for choosing our services",
  "termsAndConditions": "Standard terms and conditions apply"
}
```

**Response:**

```json
{
  "message": "Document settings created successfully",
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "documentType": "invoice",
    "header": {
      "logo": {
        "url": null,
        "publicId": null
      },
      "companyName": "My Insurance Company",
      "companyAddress": "123 Main Street, City, Country",
      "companyPhone": "+1234567890",
      "companyEmail": "info@myinsurance.com",
      "companyWebsite": "https://myinsurance.com"
    },
    "footer": {
      "logo": {
        "url": null,
        "publicId": null
      },
      "footerText": "Thank you for choosing our services",
      "termsAndConditions": "Standard terms and conditions apply",
      "signature": {
        "url": null,
        "publicId": null
      }
    },
    "isActive": true,
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Document Settings

**GET** `/api/v1/document-settings`

Get all document settings with optional filtering.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `isActive` (optional): Filter by active status (true/false)

**Example:**

```
GET /api/v1/document-settings?isActive=true
```

**Response:**

```json
{
  "message": "Document settings retrieved successfully",
  "settings": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "documentType": "invoice",
      "header": { ... },
      "footer": { ... },
      "isActive": true,
      "createdBy": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "John Doe"
      }
    }
  ]
}
```

### 3. Get Document Settings by Type

**GET** `/api/v1/document-settings/:documentType`

Get document settings for a specific document type.

**Headers:**

```
Authorization: Bearer <token>
```

**Example:**

```
GET /api/v1/document-settings/invoice
```

**Response:**

```json
{
  "message": "Document settings retrieved successfully",
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "documentType": "invoice",
    "header": { ... },
    "footer": { ... },
    "isActive": true
  }
}
```

### 4. Update Document Settings

**PUT** `/api/v1/document-settings/:id`

Update existing document settings.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**

```json
{
  "companyName": "Updated Company Name",
  "companyAddress": "Updated Address",
  "footerText": "Updated footer text",
  "isActive": false
}
```

**Response:**

```json
{
  "message": "Document settings updated successfully",
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "documentType": "invoice",
    "header": { ... },
    "footer": { ... },
    "isActive": false,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d1"
  }
}
```

### 5. Upload Header Logo

**POST** `/api/v1/document-settings/:documentType/header-logo`

Upload header logo for a specific document type.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**

- `logo`: Image file (PNG, JPEG)

**Example:**

```
POST /api/v1/document-settings/invoice/header-logo
```

**Response:**

```json
{
  "message": "Header logo uploaded successfully",
  "logo": {
    "url": "https://res.cloudinary.com/.../header-logo.png",
    "publicId": "document-settings/headers/abc123"
  }
}
```

### 6. Upload Footer Logo

**POST** `/api/v1/document-settings/:documentType/footer-logo`

Upload footer logo for a specific document type.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**

- `logo`: Image file (PNG, JPEG)

**Example:**

```
POST /api/v1/document-settings/invoice/footer-logo
```

### 7. Upload Signature

**POST** `/api/v1/document-settings/:documentType/signature`

Upload signature for a specific document type.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**

- `signature`: Image file (PNG, JPEG)

**Example:**

```
POST /api/v1/document-settings/invoice/signature
```

### 8. Toggle Document Settings Status

**PATCH** `/api/v1/document-settings/:id/toggle`

Toggle active status of document settings.

**Headers:**

```
Authorization: Bearer <token>
```

**Example:**

```
PATCH /api/v1/document-settings/64f8a1b2c3d4e5f6a7b8c9d0/toggle
```

**Response:**

```json
{
  "message": "Document settings activated successfully",
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "isActive": true
  }
}
```

### 9. Delete Document Settings

**DELETE** `/api/v1/document-settings/:id`

Delete document settings and associated files.

**Headers:**

```
Authorization: Bearer <token>
```

**Example:**

```
DELETE /api/v1/document-settings/64f8a1b2c3d4e5f6a7b8c9d0
```

**Response:**

```json
{
  "message": "Document settings deleted successfully"
}
```

## Authorization

- **Admin**: Full access to all endpoints
- **Manager**: Can create, update, upload files, and toggle status
- **Agent**: Can only view document settings

## File Upload Requirements

- **Supported Formats**: PNG, JPEG
- **Maximum Size**: 10MB
- **Storage**: Cloudinary cloud storage
- **Automatic Cleanup**: Old files are automatically deleted when replaced

## Usage Examples

### Setting up Invoice Document Settings

1. **Create settings:**

```bash
curl -X POST http://localhost:5000/api/v1/document-settings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "documentType": "invoice",
    "companyName": "My Insurance Company",
    "companyAddress": "123 Main Street, City, Country",
    "companyPhone": "+1234567890",
    "companyEmail": "info@myinsurance.com",
    "footerText": "Thank you for choosing our services"
  }'
```

2. **Upload header logo:**

```bash
curl -X POST http://localhost:5000/api/v1/document-settings/invoice/header-logo \
  -H "Authorization: Bearer <token>" \
  -F "logo=@/path/to/logo.png"
```

3. **Upload signature:**

```bash
curl -X POST http://localhost:5000/api/v1/document-settings/invoice/signature \
  -H "Authorization: Bearer <token>" \
  -F "signature=@/path/to/signature.png"
```

### Getting Settings for Document Generation

```javascript
// Get invoice settings for document generation
const response = await fetch("/api/v1/document-settings/invoice", {
  headers: {
    Authorization: "Bearer " + token,
  },
});

const { settings } = await response.json();

// Use settings in document generation
const documentData = {
  header: {
    logo: settings.header.logo.url,
    companyName: settings.header.companyName,
    companyAddress: settings.header.companyAddress,
    // ... other header fields
  },
  footer: {
    logo: settings.footer.logo.url,
    footerText: settings.footer.footerText,
    signature: settings.footer.signature.url,
    // ... other footer fields
  },
};
```

## Error Handling

The module includes comprehensive error handling:

- **400**: Invalid input data or file upload errors
- **401**: Unauthorized access
- **403**: Insufficient permissions
- **404**: Document settings not found
- **409**: Document settings already exist for the type
- **500**: Internal server errors

## Audit Logging

All operations are logged with:

- User who performed the action
- Action type (create, update, delete, upload)
- Entity type and ID
- Old and new values
- Timestamp

## Notifications

Automatic notifications are sent for:

- Creating document settings
- Updating settings
- Uploading files
- Toggling status
- Deleting settings

## Best Practices

1. **Create settings first**: Always create document settings before uploading files
2. **Use appropriate file sizes**: Keep images under 2MB for better performance
3. **Test with different document types**: Ensure settings work for all document types
4. **Backup important files**: Keep local copies of logos and signatures
5. **Monitor storage usage**: Regularly check Cloudinary storage usage
