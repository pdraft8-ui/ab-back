import InsuranceCompany from "../../../../DB/models/insuranceCompany.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import { sendNotificationLogic } from "../../notification/controller/notification.controller.js";
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
export const addInsuranceCompany = async (req, res, next) => {
    try {
        const { name, contact, address, insuranceType, rates } = req.body;
        if (!name || !insuranceType) {
            return res
                .status(400)
                .json({ message: "Name and insurance type are required!" });
        }
        if (insuranceType !== "الزامي" && !rates) {
            return res
                .status(400)
                .json({
                message: "Rate details are required for comprehensive or third-party insurance!",
            });
        }
        const newCompany = new InsuranceCompany({
            name,
            contact: contact || "",
            address: address || "",
            insuranceType,
            rates: insuranceType === "الزامي" ? {} : rates,
        });
        await newCompany.save();
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} add new insurance company the name is : ${name}`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        await logAudit({
            userId: req.user._id,
            userName: findUser.name,
            action: `Create InsuranceCompany by  ${findUser.name} `,
            entity: "InsuranceCompany",
            entityId: newCompany._id,
            newValue: newCompany,
        });
        res
            .status(201)
            .json({
            message: "Insurance company added successfully!",
            company: newCompany,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateInsuranceCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, contact, address, insuranceType, rates } = req.body;
        const existingCompany = await InsuranceCompany.findById(id);
        if (!existingCompany) {
            return res.status(404).json({ message: "Insurance company not found!" });
        }
        const oldValue = existingCompany.toObject();
        const updatedData = { name, contact, address, insuranceType };
        if (insuranceType !== "الزامي") {
            updatedData.rates = rates;
        }
        const updatedCompany = await InsuranceCompany.findByIdAndUpdate(id, updatedData, { new: true });
        const findUser = await UserModel.findById(req.user._id);
        const message = `${findUser.name} update insurance company `;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        await logAudit({
            userId: req.user._id,
            userName: findUser.name,
            action: `Update InsuranceCompany by  ${findUser.name}`,
            entity: "InsuranceCompany",
            entityId: updatedCompany._id,
            oldValue,
            newValue: updatedCompany,
        });
        res
            .status(200)
            .json({
            message: "Insurance company updated successfully!",
            company: updatedCompany,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteInsuranceCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCompany = await InsuranceCompany.findByIdAndDelete(id);
        if (!deletedCompany) {
            return res.status(404).json({ message: "Insurance company not found!" });
        }
        const user = req.user;
        const message = `${user.name} delete insurance company `;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        await logAudit({
            userId: user._id,
            userName: user.name,
            action: `Delete InsuranceCompany by ${user.name}`,
            entity: "InsuranceCompany",
            entityId: deletedCompany._id,
            oldValue: deletedCompany,
            newValue: null,
        });
        res
            .status(200)
            .json({ message: "Insurance company deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
};
export const getAllInsuranceCompanies = async (req, res, next) => {
    try {
        const companies = await InsuranceCompany.find();
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=insuranceCompany.controller.js.map