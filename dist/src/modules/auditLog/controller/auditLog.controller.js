import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
export const findAllAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLogModel.find({}).sort({ createdAt: -1 }); // ترتيب من الأحدث إلى الأقدم
        return res.status(200).json({
            success: true,
            message: "Audit logs retrieved successfully",
            data: logs || [],
        });
    }
    catch (error) {
        console.error("Error fetching audit logs:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching audit logs.",
            errors: [error.message],
        });
    }
};
export const getAllAuditLogs = async (req, res, next) => {
    try {
        const auditLogs = await AuditLogModel.find().populate("user", "name email");
        return res.status(200).json({
            success: true,
            message: "Audit logs retrieved successfully",
            data: auditLogs || [],
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auditLog.controller.js.map