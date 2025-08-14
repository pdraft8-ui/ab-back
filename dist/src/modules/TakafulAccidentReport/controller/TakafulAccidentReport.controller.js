import Customer from "../../../../DB/models/Customer.model.js";
import TakafulAccidentReportModel from "../../../../DB/models/TakafulAccidentReport.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import { createNotification, sendNotificationLogic, } from "../../notification/controller/notification.controller.js";
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
export const addAccidentReport = async (req, res) => {
    try {
        const { plateNumber } = req.params;
        const customer = await Customer.findOne({
            "vehicles.plateNumber": plateNumber,
        });
        if (!customer) {
            return res
                .status(404)
                .json({ message: "Customer person or vehicle not found" });
        }
        const vehicle = customer.vehicles.find((v) => v.plateNumber.toString() === plateNumber.toString());
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found under the customer person's vehicles",
            });
        }
        const newAccidentReport = new TakafulAccidentReportModel({
            customerId: customer._id,
            accidentInfo: {
                reportDate: req.body.accidentInfo.reportDate,
                accidentDate: req.body.accidentInfo.accidentDate,
                accidentType: req.body.accidentInfo.accidentType,
                accidentLocation: req.body.accidentInfo.accidentLocation,
                accidentTime: req.body.accidentInfo.accidentTime,
                passengersCount: req.body.accidentInfo.passengersCount,
                agentName: req.body.accidentInfo.agentName,
            },
            policyInfo: {
                policyNumber: req.body.policyInfo.policyNumber,
                branch: req.body.policyInfo.branch,
                durationFrom: req.body.policyInfo.durationFrom,
                durationTo: req.body.policyInfo.durationTo,
                issueDate: req.body.policyInfo.issueDate,
                isFullCoverage: req.body.policyInfo.isFullCoverage,
                fullCoverageFee: req.body.policyInfo.fullCoverageFee,
                isThirdParty: req.body.policyInfo.isThirdParty,
                thirdPartyFee: req.body.policyInfo.thirdPartyFee,
                isMandatory: req.body.policyInfo.isMandatory,
                maxAllowedPassengers: req.body.policyInfo.maxAllowedPassengers,
            },
            customerPerson: {
                name: req.body.customerPerson.name,
                address: req.body.customerPerson.address,
                residence: req.body.customerPerson.residence,
                workAddress: req.body.customerPerson.workAddress,
                workPhone: req.body.customerPerson.workPhone,
            },
            driverInfo: {
                name: req.body.driverInfo.name,
                idNumber: req.body.driverInfo.idNumber,
                licenseNumber: req.body.driverInfo.licenseNumber,
                licenseType: req.body.driverInfo.licenseType,
                licenseExpiry: req.body.driverInfo.licenseExpiry,
                phoneNumber: req.body.driverInfo.phoneNumber,
                relationToCustomer: req.body.driverInfo.relationToCustomer,
            },
            customerVehicle: {
                plateNumber: req.body.customerVehicle.plateNumber,
                model: req.body.customerVehicle.model,
                type: req.body.customerVehicle.type,
                manufactureYear: req.body.customerVehicle.manufactureYear,
                chassisNumber: req.body.customerVehicle.chassisNumber,
                engineNumber: req.body.customerVehicle.engineNumber,
                insuranceCompany: req.body.customerVehicle.insuranceCompany,
                policyNumber: req.body.customerVehicle.policyNumber,
                insuranceType: req.body.customerVehicle.insuranceType,
                insurancePeriod: {
                    from: req.body.customerVehicle.insurancePeriod.from,
                    to: req.body.customerVehicle.insurancePeriod.to,
                },
                damage: {
                    front: req.body.customerVehicle.damage.front,
                    back: req.body.customerVehicle.damage.back,
                    left: req.body.customerVehicle.damage.left,
                    right: req.body.customerVehicle.damage.right,
                    estimatedValue: req.body.customerVehicle.damage.estimatedValue,
                    towingCompany: req.body.customerVehicle.damage.towingCompany,
                    garage: req.body.customerVehicle.damage.garage,
                },
            },
            otherVehicles: req.body.otherVehicles.map((v) => ({
                vehicleNumber: v.vehicleNumber,
                ownerName: v.ownerName,
                driverName: v.driverName,
                colorAndType: v.colorAndType,
                totalWeight: v.totalWeight,
                address: v.address,
                phone: v.phone,
                insuranceCompany: v.insuranceCompany,
                policyNumber: v.policyNumber,
                insuranceType: v.insuranceType,
                damageDescription: v.damageDescription,
            })),
            policeAndWitnesses: {
                reportedDate: req.body.policeAndWitnesses.reportedDate,
                policeAuthority: req.body.policeAndWitnesses.policeAuthority,
                sketchDrawn: req.body.policeAndWitnesses.sketchDrawn,
                policeCame: req.body.policeAndWitnesses.policeCame,
                witnesses: req.body.policeAndWitnesses.witnesses.map((w) => ({
                    name: w.name,
                    phone: w.phone,
                    address: w.address,
                })),
            },
            passengers: req.body.passengers.map((p) => ({
                name: p.name,
                age: p.age,
                address: p.address,
                hospital: p.hospital,
                injuryDescription: p.injuryDescription,
            })),
            accidentNarration: req.body.accidentNarration,
            notifierSignature: req.body.notifierSignature,
            receiverName: req.body.receiverName,
            receiverNotes: req.body.receiverNotes,
            declaration: {
                declarerName: req.body.declaration.declarerName,
                declarationDate: req.body.declaration.declarationDate,
                documentCheckerName: req.body.declaration.documentCheckerName,
                checkerJob: req.body.declaration.checkerJob,
                checkerSignature: req.body.declaration.checkerSignature,
                checkerDate: req.body.declaration.checkerDate,
            },
        });
        await newAccidentReport.save();
        const user = req.user;
        const message = `${user.name} add new  takaful accident report`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        await logAudit({
            userId: user._id,
            userName: user.name,
            action: `Add new  Takaful Accident Report  by${user.name}`,
            entity: " Takaful Accident Report",
            entityId: newAccidentReport._id,
            oldValue: null,
            newValue: newAccidentReport,
        });
        return res.status(201).json({
            message: "Accident report added successfully",
            data: newAccidentReport,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "An error occurred while adding the accident report" });
    }
};
export const deleteAccidentReport = async (req, res) => {
    try {
        const { id } = req.params;
        const findTakafulAccident = await TakafulAccidentReportModel.findById(id);
        if (!findTakafulAccident) {
            return res.status(404).json({ message: "Accident report not found" });
        }
        const deleteAcc = await TakafulAccidentReportModel.findByIdAndDelete(id);
        if (!deleteAcc) {
            return res
                .status(500)
                .json({ message: "Failed to delete accident report" });
        }
        const user = req.user;
        const message = `${user.name} delete takaful accident report`;
        await sendNotificationLogic({
            senderId: req.user._id,
            message,
        });
        await logAudit({
            userId: user._id,
            userName: user.name,
            action: `User ${user.name} (ID: ${user._id}) deleted a Takaful accident report `,
            entity: "TakafulAccidentReport",
            entityId: id,
            oldValue: findTakafulAccident,
            newValue: null,
        });
        return res
            .status(200)
            .json({ message: "Accident report deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while deleting the accident report",
        });
    }
};
export const getAllAccidentReports = async (req, res, next) => {
    try {
        const findAll = await TakafulAccidentReportModel.find();
        return res.status(200).json({
            success: true,
            message: "Success",
            data: findAll || [],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching accident reports",
            errors: [error.message],
        });
    }
};
export const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const find = await TakafulAccidentReportModel.findById(id);
        if (!find) {
            return res.status(404).json({ message: "Accident report not found" });
        }
        else {
            return res.status(200).json({ message: "Success", data: find });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while fetching the accident report",
        });
    }
};
//# sourceMappingURL=TakafulAccidentReport.controller.js.map