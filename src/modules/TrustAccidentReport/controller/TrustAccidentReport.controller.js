import Customer from "../../../../DB/models/Customer.model.js";
import TrustAccidentReportModel from "../../../../DB/models/TrustAccidentReport.model.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";
import {
  createNotification,
  sendNotificationLogic,
} from "../../notification/controller/notification.controller.js";
const logAudit = async ({
  userId,
  action,
  entity,
  entityId,
  userName,
  oldValue = null,
  newValue = null,
}) => {
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
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
};

export const addAccedentReport = async (req, res) => {
  const { plateNumber } = req.params;
  try {
    const customer = await Customer.findOne({
      "vehicles.plateNumber": plateNumber,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer person or vehicle not found" });
    }

    const vehicle = customer.vehicles.find(
      (v) => v.plateNumber.toString() === plateNumber.toString()
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found in the customer person's vehicle list",
      });
    }

    const newAccidentReport = new TrustAccidentReportModel({
      customerId: customer._id,

      accidentDetails: {
        location: req.body.accidentDetails.location,
        date: req.body.accidentDetails.date,
        time: req.body.accidentDetails.time,
        accidentType: req.body.accidentDetails.accidentType,
        reportDate: req.body.accidentDetails.reportDate,
      },

      customerVehicle: {
        plateNumber: vehicle.plateNumber,
        type: vehicle.type,
        model: vehicle.model,
        color: vehicle.color,
        ownership: vehicle.ownership,
        usage: req.body.customerVehicle.usage,
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
      },

      driverDetails: {
        name: req.body.driverDetails.name,
        idNumber: req.body.driverDetails.idNumber,
        licenseNumber: req.body.driverDetails.licenseNumber,
        licenseType: req.body.driverDetails.licenseType,
        licenseExpiry: req.body.driverDetails.licenseExpiry,
        phoneNumber: req.body.driverDetails.phoneNumber,
        relationToCustomer: req.body.driverDetails.relationToCustomer,
      },

      damages: {
        front: req.body.damages.front,
        back: req.body.damages.back,
        right: req.body.damages.right,
        left: req.body.damages.left,
        estimatedCost: req.body.damages.estimatedCost,
        garageName: req.body.damages.garageName,
        towCompany: req.body.damages.towCompany,
      },

      otherVehicle: {
        plateNumber: req.body.otherVehicle.plateNumber,
        type: req.body.otherVehicle.type,
        model: req.body.otherVehicle.model,
        color: req.body.otherVehicle.color,
        insuranceCompany: req.body.otherVehicle.insuranceCompany,
        driverName: req.body.otherVehicle.driverName,
        driverAddress: req.body.otherVehicle.driverAddress,
        licenseNumber: req.body.otherVehicle.licenseNumber,
        damageDescription: req.body.otherVehicle.damageDescription,
      },

      witnesses: req.body.witnesses,

      policeReport: {
        reportDate: req.body.policeReport.reportDate,
        authority: req.body.policeReport.authority,
        sketchDrawn: req.body.policeReport.sketchDrawn,
        officersPresent: req.body.policeReport.officersPresent,
      },

      narration: req.body.narration,
      signature: req.body.signature,

      declaration: {
        declarerName: req.body.declaration.declarerName,
        declarationDate: req.body.declaration.declarationDate,
        reviewerName: req.body.declaration.reviewerName,
        reviewerSignature: req.body.declaration.reviewerSignature,
        reviewDate: req.body.declaration.reviewDate,
      },
    });

    await newAccidentReport.save();

    const user = req.user;
    const message = `${user.name} add new  trust accident report`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: user._id,
      userName: user.name,
      action: `Add new  Trust Accident Report  by${user.name}`,
      entity: " Trust Accident Report",
      entityId: newAccidentReport._id,
      oldValue: null,
      newValue: newAccidentReport,
    });

    return res.status(201).json({
      message: "Accident report added successfully",
      data: newAccidentReport,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding the accident report" });
  }
};

export const deleteAccidentReport = async (req, res) => {
  try {
    const { id } = req.params;
    const accidentReport = await TrustAccidentReportModel.findById(id);

    if (!accidentReport) {
      return res.status(404).json({ message: "Accident report not found" });
    }

    const deleted = await TrustAccidentReportModel.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(400)
        .json({ message: "Failed to delete accident report" });
    }

    const user = req.user;
    const message = `${user.name} delete  trust accident report`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: user._id,
      userName: user.name,
      action: `User ${user.name} (ID: ${user._id}) deleted a Trust accident report`,
      entity: "TrustAccidentReport",
      entityId: id,
      oldValue: accidentReport,
      newValue: null,
    });

    return res
      .status(200)
      .json({ message: "Accident report deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the accident report",
    });
  }
};

export const getAllAccidentReports = async (req, res, next) => {
  try {
    const allReports = await TrustAccidentReportModel.find();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: allReports || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving accident reports",
      errors: [error.message],
    });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await TrustAccidentReportModel.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Accident report not found" });
    }
    return res.status(200).json({ message: "Success", data: report });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving the accident report",
    });
  }
};
