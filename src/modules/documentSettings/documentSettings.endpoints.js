// Document Settings Endpoints

/**
 * @swagger
 * components:
 *   schemas:
 *     DocumentSettings:
 *       type: object
 *       required:
 *         - documentType
 *         - createdBy
 *       properties:
 *         documentType:
 *           type: string
 *           enum: [invoice, receipt, contract, policy, report]
 *           description: Type of document for these settings
 *         header:
 *           type: object
 *           properties:
 *             logo:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 publicId:
 *                   type: string
 *             companyName:
 *               type: string
 *               default: "Insurance Management System"
 *             companyAddress:
 *               type: string
 *             companyPhone:
 *               type: string
 *             companyEmail:
 *               type: string
 *             companyWebsite:
 *               type: string
 *         footer:
 *           type: object
 *           properties:
 *             logo:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 publicId:
 *                   type: string
 *             footerText:
 *               type: string
 *             termsAndConditions:
 *               type: string
 *             signature:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 publicId:
 *                   type: string
 *         isActive:
 *           type: boolean
 *           default: true
 *         createdBy:
 *           type: string
 *           description: User ID who created the settings
 *         updatedBy:
 *           type: string
 *           description: User ID who last updated the settings
 */

/**
 * @swagger
 * /api/document-settings:
 *   post:
 *     summary: Create new document settings
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documentType
 *             properties:
 *               documentType:
 *                 type: string
 *                 enum: [invoice, receipt, contract, policy, report]
 *               companyName:
 *                 type: string
 *               companyAddress:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *               companyWebsite:
 *                 type: string
 *               footerText:
 *                 type: string
 *               termsAndConditions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document settings created successfully
 *       409:
 *         description: Document settings already exist for this type
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/document-settings:
 *   get:
 *     summary: Get all document settings
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Document settings retrieved successfully
 */

/**
 * @swagger
 * /api/document-settings/{documentType}:
 *   get:
 *     summary: Get document settings by type
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [invoice, receipt, contract, policy, report]
 *     responses:
 *       200:
 *         description: Document settings retrieved successfully
 *       404:
 *         description: Document settings not found
 */

/**
 * @swagger
 * /api/document-settings/{id}:
 *   put:
 *     summary: Update document settings
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyAddress:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               companyEmail:
 *                 type: string
 *               companyWebsite:
 *                 type: string
 *               footerText:
 *                 type: string
 *               termsAndConditions:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Document settings updated successfully
 *       404:
 *         description: Document settings not found
 */

/**
 * @swagger
 * /api/document-settings/{id}:
 *   delete:
 *     summary: Delete document settings
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document settings deleted successfully
 *       404:
 *         description: Document settings not found
 */

/**
 * @swagger
 * /api/document-settings/{id}/toggle:
 *   patch:
 *     summary: Toggle document settings active status
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document settings status toggled successfully
 *       404:
 *         description: Document settings not found
 */

/**
 * @swagger
 * /api/document-settings/{documentType}/header-logo:
 *   post:
 *     summary: Upload header logo for document type
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [invoice, receipt, contract, policy, report]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Header logo uploaded successfully
 *       404:
 *         description: Document settings not found
 *       400:
 *         description: No file uploaded
 */

/**
 * @swagger
 * /api/document-settings/{documentType}/footer-logo:
 *   post:
 *     summary: Upload footer logo for document type
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [invoice, receipt, contract, policy, report]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Footer logo uploaded successfully
 *       404:
 *         description: Document settings not found
 *       400:
 *         description: No file uploaded
 */

/**
 * @swagger
 * /api/document-settings/{documentType}/signature:
 *   post:
 *     summary: Upload signature for document type
 *     tags: [Document Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [invoice, receipt, contract, policy, report]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               signature:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Signature uploaded successfully
 *       404:
 *         description: Document settings not found
 *       400:
 *         description: No file uploaded
 */

export const documentSettingsEndpoints = {
  // Create document settings
  createDocumentSettings: {
    path: "/document-settings",
    method: "POST",
    description: "Create new document settings for a specific document type",
    roles: ["admin", "manager"],
    body: {
      documentType:
        "string (required) - invoice, receipt, contract, policy, report",
      companyName: "string (optional) - Company name for header",
      companyAddress: "string (optional) - Company address",
      companyPhone: "string (optional) - Company phone number",
      companyEmail: "string (optional) - Company email",
      companyWebsite: "string (optional) - Company website",
      footerText: "string (optional) - Footer text",
      termsAndConditions: "string (optional) - Terms and conditions text",
    },
  },

  // Get all document settings
  getAllDocumentSettings: {
    path: "/document-settings",
    method: "GET",
    description: "Get all document settings with optional filtering",
    roles: ["admin", "manager", "agent"],
    query: {
      isActive: "boolean (optional) - Filter by active status",
    },
  },

  // Get document settings by type
  getDocumentSettingsByType: {
    path: "/document-settings/:documentType",
    method: "GET",
    description: "Get document settings for a specific document type",
    roles: ["admin", "manager", "agent"],
    params: {
      documentType:
        "string (required) - invoice, receipt, contract, policy, report",
    },
  },

  // Get document settings by ID
  getDocumentSettingsById: {
    path: "/document-settings/id/:id",
    method: "GET",
    description: "Get document settings by ID",
    roles: ["admin", "manager", "agent"],
    params: {
      id: "string (required) - Document settings ID",
    },
  },

  // Update document settings
  updateDocumentSettings: {
    path: "/document-settings/:id",
    method: "PUT",
    description: "Update existing document settings",
    roles: ["admin", "manager"],
    params: {
      id: "string (required) - Document settings ID",
    },
    body: {
      companyName: "string (optional) - Company name for header",
      companyAddress: "string (optional) - Company address",
      companyPhone: "string (optional) - Company phone number",
      companyEmail: "string (optional) - Company email",
      companyWebsite: "string (optional) - Company website",
      footerText: "string (optional) - Footer text",
      termsAndConditions: "string (optional) - Terms and conditions text",
      isActive: "boolean (optional) - Active status",
    },
  },

  // Delete document settings
  deleteDocumentSettings: {
    path: "/document-settings/:id",
    method: "DELETE",
    description: "Delete document settings and associated files",
    roles: ["admin"],
    params: {
      id: "string (required) - Document settings ID",
    },
  },

  // Toggle document settings status
  toggleDocumentSettingsStatus: {
    path: "/document-settings/:id/toggle",
    method: "PATCH",
    description: "Toggle active status of document settings",
    roles: ["admin", "manager"],
    params: {
      id: "string (required) - Document settings ID",
    },
  },

  // Upload header logo
  uploadHeaderLogo: {
    path: "/document-settings/:documentType/header-logo",
    method: "POST",
    description: "Upload header logo for a specific document type",
    roles: ["admin", "manager"],
    params: {
      documentType:
        "string (required) - invoice, receipt, contract, policy, report",
    },
    body: {
      logo: "file (required) - Image file (PNG, JPEG)",
    },
  },

  // Upload footer logo
  uploadFooterLogo: {
    path: "/document-settings/:documentType/footer-logo",
    method: "POST",
    description: "Upload footer logo for a specific document type",
    roles: ["admin", "manager"],
    params: {
      documentType:
        "string (required) - invoice, receipt, contract, policy, report",
    },
    body: {
      logo: "file (required) - Image file (PNG, JPEG)",
    },
  },

  // Upload signature
  uploadSignature: {
    path: "/document-settings/:documentType/signature",
    method: "POST",
    description: "Upload signature for a specific document type",
    roles: ["admin", "manager"],
    params: {
      documentType:
        "string (required) - invoice, receipt, contract, policy, report",
    },
    body: {
      signature: "file (required) - Image file (PNG, JPEG)",
    },
  },
};
