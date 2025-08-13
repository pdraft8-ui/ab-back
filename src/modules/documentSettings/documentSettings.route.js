import express from "express";
import {
  createDocumentSettings,
  getAllDocumentSettings,
  getDocumentSettingsByType,
  getDocumentSettingsById,
  updateDocumentSettings,
  deleteDocumentSettings,
  toggleDocumentSettingsStatus,
  uploadHeaderLogo,
  uploadFooterLogo,
  uploadSignature,
} from "./controller/documentSettings.controller.js";
import { auth } from "../../midlleWare/auth.js";
import { myMulterImages, HME } from "../../Servicess/multer.js";

const router = express.Router();

// Create document settings
router.post("/", auth(["admin", "manager"]), createDocumentSettings);

// Get all document settings
router.get("/", auth(["admin", "manager", "agent"]), getAllDocumentSettings);

// Get document settings by type
router.get(
  "/:documentType",
  auth(["admin", "manager", "agent"]),
  getDocumentSettingsByType
);

// Get document settings by ID
router.get(
  "/id/:id",
  auth(["admin", "manager", "agent"]),
  getDocumentSettingsById
);

// Update document settings
router.put("/:id", auth(["admin", "manager"]), updateDocumentSettings);

// Delete document settings
router.delete("/:id", auth(["admin"]), deleteDocumentSettings);

// Toggle document settings status
router.patch(
  "/:id/toggle",
  auth(["admin", "manager"]),
  toggleDocumentSettingsStatus
);

// Upload header logo
router.post(
  "/:documentType/header-logo",
  auth(["admin", "manager"]),
  myMulterImages("uploads/document-settings/headers").single("logo"),
  HME,
  uploadHeaderLogo
);

// Upload footer logo
router.post(
  "/:documentType/footer-logo",
  auth(["admin", "manager"]),
  myMulterImages("uploads/document-settings/footers").single("logo"),
  HME,
  uploadFooterLogo
);

// Upload signature
router.post(
  "/:documentType/signature",
  auth(["admin", "manager"]),
  myMulterImages("uploads/document-settings/signatures").single("signature"),
  HME,
  uploadSignature
);

export default router;
