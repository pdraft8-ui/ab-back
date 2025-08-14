import agentModel from "../../../../DB/models/agent.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
const logAudit = async ({ userId, action, entity, entityId, userName, oldValue = null, newValue = null, }) => {
    try {
        await AuditLogModel.create({
            user: userId,
            action,
            entity,
            entityId,
            oldValue,
            newValue,
            userName,
        });
    }
    catch (error) {
        console.error("Failed to create audit log:", error);
    }
};
export const addAgents = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        // Check for required fields
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, email, and phone are required.",
                errors: [
                    !name ? "name is required" : null,
                    !email ? "email is required" : null,
                    !phone ? "phone is required" : null,
                ].filter(Boolean),
            });
        }
        // Check for existing agent by email
        const findAgentByEmail = await agentModel.findOne({ email });
        if (findAgentByEmail) {
            return res.status(400).json({
                success: false,
                message: "Agent already exists",
                errors: ["Agent with this email already exists"],
            });
        }
        // Check for existing agent by phone
        const findAgentByPhone = await agentModel.findOne({ phone });
        if (findAgentByPhone) {
            return res.status(400).json({
                success: false,
                message: "Agent already exists",
                errors: ["Agent with this phone number already exists"],
            });
        }
        const newAgent = new agentModel({
            name,
            email,
            phone,
        });
        const savedAgent = await newAgent.save();
        if (!savedAgent) {
            return res.status(400).json({
                success: false,
                message: "Error adding agent",
                errors: ["Failed to save agent"],
            });
        }
        const findUser = await UserModel.findById(req.user._id);
        await logAudit({
            userId: req.user._id,
            action: `Add new agent by ${findUser.name}`,
            userName: findUser.name,
            entity: "Agent",
            entityId: savedAgent._id,
            oldValue: null,
            newValue: {
                name: savedAgent.name,
                email: savedAgent.email,
                phone: savedAgent.phone,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Agent added successfully",
            data: savedAgent,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteAgents = async (req, res, next) => {
    const { id } = req.params;
    try {
        const findAgent = await agentModel.findById(id);
        if (!findAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not exist",
                errors: ["No agent with the provided ID"],
            });
        }
        const oldValue = {
            name: findAgent.name,
            email: findAgent.email,
            phone: findAgent.phone,
        };
        const findUser = await UserModel.findById(req.user._id);
        const deletedAgent = await agentModel.findByIdAndDelete(id);
        if (!deletedAgent) {
            return res.status(400).json({
                success: false,
                message: "Deletion error",
                errors: ["Failed to delete agent"],
            });
        }
        else {
            await logAudit({
                userId: req.user._id,
                action: `Delete agent by ${findUser.name}`,
                userName: findUser.name,
                entity: "Agent",
                entityId: deletedAgent._id,
                oldValue,
                newValue: null,
            });
            return res.status(200).json({
                success: true,
                message: "Agent deleted successfully",
            });
        }
    }
    catch (error) {
        next(error);
    }
};
export const updateAgents = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    try {
        const findAgent = await agentModel.findById(id);
        if (!findAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
                errors: ["No agent with the provided ID"],
            });
        }
        const findUser = await UserModel.findById(req.user._id);
        const oldValue = {
            name: findAgent.name,
            email: findAgent.email,
            phone: findAgent.phone,
        };
        findAgent.name = name || findAgent.name;
        findAgent.email = email || findAgent.email;
        findAgent.phone = phone || findAgent.phone;
        await findAgent.save();
        const newValue = {
            name: findAgent.name,
            email: findAgent.email,
            phone: findAgent.phone,
        };
        await logAudit({
            userId: req.user._id,
            action: `Update agent info by ${findUser.name}`,
            userName: findUser.name,
            entity: "Agent",
            entityId: findAgent._id,
            oldValue,
            newValue,
        });
        res.status(200).json({
            success: true,
            message: "Agent updated successfully",
            data: findAgent,
        });
    }
    catch (error) {
        next(error);
    }
};
export const allAgents = async (req, res, next) => {
    try {
        const getAll = await agentModel.find();
        return res.status(200).json({
            success: true,
            message: "Agents fetched successfully",
            data: getAll || [],
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=Agents.controller.js.map