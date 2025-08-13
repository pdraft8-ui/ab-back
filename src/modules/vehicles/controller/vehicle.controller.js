import localStorageService from "../../../Servicess/localStorage.js";
import Vehicle from "../../../../DB/models/Vehicle.model.js";
import Customer from "../../../../DB/models/Customer.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import Invoice from "../../../../DB/models/Invoice.model.js";
import Payment from "../../../../DB/models/Payment.model.js";
import InsuranceCompany from "../../../../DB/models/insuranceCompany.model.js";
import mongoose from "mongoose";
import {
  createNotification,
  sendNotificationLogic,
} from "../../notification/controller/notification.controller.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";

// Helper function to convert vehicle data to include full URLs
const convertVehicleToFullUrls = (vehicle) => {
  const vehicleObj = vehicle.toObject ? vehicle.toObject() : vehicle;

  // Convert vehicle image to full URL
  if (vehicleObj.image) {
    vehicleObj.image = localStorageService.getFullUrl(vehicleObj.image);
  }

  // Convert insurance files to full URLs
  if (vehicleObj.insurance && Array.isArray(vehicleObj.insurance)) {
    vehicleObj.insurance = vehicleObj.insurance.map((insurance) => {
      const insuranceObj = insurance.toObject
        ? insurance.toObject()
        : insurance;

      // Convert insurance files
      if (
        insuranceObj.insuranceFiles &&
        Array.isArray(insuranceObj.insuranceFiles)
      ) {
        insuranceObj.insuranceFiles = localStorageService.getFullUrls(
          insuranceObj.insuranceFiles
        );
      }

      // Convert check images
      if (
        insuranceObj.checkDetails &&
        Array.isArray(insuranceObj.checkDetails)
      ) {
        insuranceObj.checkDetails = insuranceObj.checkDetails.map((check) => {
          const checkObj = check.toObject ? check.toObject() : check;
          if (checkObj.checkImage) {
            checkObj.checkImage = localStorageService.getFullUrl(
              checkObj.checkImage
            );
          }
          return checkObj;
        });
      }

      return insuranceObj;
    });
  }

  return vehicleObj;
};

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

export const addVehicle = async (req, res, next) => {
  const {
    customerId: bodyCustomerId,
    plateNumber,
    model,
    type,
    ownership,
    modelNumber,
    licenseExpiry,
    lastTest,
    color,
    price,
  } = req.body;

  // Get customerId from URL params or request body
  const customerId = req.params.customerId || bodyCustomerId;

  try {
    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if vehicle with this plate number already exists
    const existingVehicle = await Vehicle.findOne({ plateNumber });
    if (existingVehicle) {
      return res
        .status(409)
        .json({ message: "Vehicle with this plate number already exists" });
    }

    let imageUrl = null;
    if (req.file) {
      const result = await localStorageService.upload(
        req.file,
        "vehicles/images"
      );
      imageUrl = result.url;
    } else {
      imageUrl =
        "https://th.bing.com/th/id/OIP.eUdZe6jPSNXtNAbxcswuIgHaE8?w=4245&h=2830&rs=1&pid=ImgDetMain";
    }

    const newVehicle = new Vehicle({
      customerId,
      plateNumber,
      model,
      type,
      ownership,
      modelNumber,
      licenseExpiry,
      lastTest,
      color,
      price,
      image: imageUrl,
      insurance: [],
    });

    const savedVehicle = await newVehicle.save();
    const findUser = await UserModel.findById(req.user._id);

    const message = `${findUser.name} added new vehicle (${model} - ${plateNumber}) for customer ${customer.first_name} ${customer.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      action: `Add Vehicle by ${findUser.name}`,
      userName: findUser.name,
      entity: "Vehicle",
      entityId: savedVehicle._id,
      oldValue: null,
      newValue: savedVehicle.toObject(),
    });

    // Convert saved vehicle to include full URLs
    const vehicleWithFullUrls = convertVehicleToFullUrls(savedVehicle);

    return res.status(201).json({
      message: "Vehicle added successfully",
      savedVehicle: vehicleWithFullUrls,
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    next(error);
  }
};

export const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findVehicle = await Vehicle.findById(id).populate("customerId");
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    const findUser = await UserModel.findById(req.user._id);

    const message = `${findUser.name} deleted vehicle (${findVehicle.model} - ${findVehicle.plateNumber})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      action: `Delete Vehicle by ${findUser.name}`,
      userName: findUser.name,
      entity: "Vehicle",
      entityId: deletedVehicle._id,
      oldValue: findVehicle.toObject(),
      newValue: null,
    });

    return res.status(200).json({
      message: "Vehicle deleted successfully",
      deletedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const allVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().populate(
      "customerId",
      "first_name last_name"
    );

    // Convert all vehicles to include full URLs
    const vehiclesWithFullUrls = vehicles.map((vehicle) =>
      convertVehicleToFullUrls(vehicle)
    );

    return res.status(200).json({ vehicles: vehiclesWithFullUrls });
  } catch (error) {
    next(error);
  }
};

export const findVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate(
      "customerId",
      "first_name last_name"
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Convert vehicle to include full URLs
    const vehicleWithFullUrls = convertVehicleToFullUrls(vehicle);

    return res.status(200).json({ vehicle: vehicleWithFullUrls });
  } catch (error) {
    next(error);
  }
};

// Unified vehicle finder that searches in both Vehicle collection and customer vehicles
export const findVehicleByIdUnified = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First, try to find in the Vehicle collection
    let vehicle = await Vehicle.findById(id).populate(
      "customerId",
      "first_name last_name phone_number email"
    );

    if (vehicle) {
      return res.status(200).json({
        message: "Vehicle found in Vehicle collection",
        vehicle,
        source: "Vehicle Collection",
      });
    }

    // If not found in Vehicle collection, search in customer vehicles
    const customer = await Customer.findOne({
      "vehicles._id": id,
    }).select("first_name last_name phone_number email vehicles");

    if (customer) {
      const vehicleSubdoc = customer.vehicles.id(id);
      if (vehicleSubdoc) {
        const vehicleData = {
          ...vehicleSubdoc.toObject(),
          customerId: {
            _id: customer._id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone_number: customer.phone_number,
            email: customer.email,
          },
        };

        return res.status(200).json({
          message: "Vehicle found in customer vehicles",
          vehicle: vehicleData,
          source: "Customer Vehicles",
        });
      }
    }

    return res.status(404).json({
      message: "Vehicle not found in any collection",
      vehicleId: id,
    });
  } catch (error) {
    console.error("Error in findVehicleByIdUnified:", error);
    next(error);
  }
};

export const getVehiclesByCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const vehicles = await Vehicle.find({ customerId }).populate(
      "customerId",
      "first_name last_name"
    );
    return res.status(200).json({ vehicles });
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      plateNumber,
      model,
      type,
      ownership,
      modelNumber,
      licenseExpiry,
      lastTest,
      color,
      price,
    } = req.body;

    const findVehicle = await Vehicle.findById(id);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Check if plate number is being changed and if it already exists
    if (plateNumber && plateNumber !== findVehicle.plateNumber) {
      const existingVehicle = await Vehicle.findOne({ plateNumber });
      if (existingVehicle) {
        return res
          .status(409)
          .json({ message: "Vehicle with this plate number already exists" });
      }
    }

    let imageUrl = findVehicle.image;
    if (req.file) {
      const result = await localStorageService.upload(
        req.file,
        "vehicles/images"
      );
      imageUrl = result.url;
    }

    const oldVehicle = findVehicle.toObject();

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      {
        plateNumber: plateNumber || findVehicle.plateNumber,
        model: model || findVehicle.model,
        type: type || findVehicle.type,
        ownership: ownership || findVehicle.ownership,
        modelNumber: modelNumber || findVehicle.modelNumber,
        licenseExpiry: licenseExpiry || findVehicle.licenseExpiry,
        lastTest: lastTest || findVehicle.lastTest,
        color: color || findVehicle.color,
        price: price || findVehicle.price,
        image: imageUrl,
      },
      { new: true }
    ).populate("customerId", "first_name last_name");

    const findUser = await UserModel.findById(req.user._id);

    const message = `${findUser.name} updated vehicle (${updatedVehicle.model} - ${updatedVehicle.plateNumber})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      action: `Update Vehicle by ${findUser.name}`,
      userName: findUser.name,
      entity: "Vehicle",
      entityId: updatedVehicle._id,
      oldValue: oldVehicle,
      newValue: updatedVehicle.toObject(),
    });

    // Convert updated vehicle to include full URLs
    const vehicleWithFullUrls = convertVehicleToFullUrls(updatedVehicle);

    return res.status(200).json({
      message: "Vehicle updated successfully",
      updatedVehicle: vehicleWithFullUrls,
    });
  } catch (error) {
    next(error);
  }
};

export const addInsuranceToVehicle = async (req, res, next) => {
  const { vehicleId } = req.params;
  const {
    insuranceStartDate,
    insuranceEndDate,
    insuranceType,
    insuranceCompany,
    agent,
    paymentMethod,
    insuranceAmount,
    paidAmount,
    isUnder24,
  } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const company = await InsuranceCompany.findOne({ name: insuranceCompany });
    if (!company) {
      return res
        .status(404)
        .json({ message: `Insurance company ${insuranceCompany} not found` });
    }

    let insuranceFilesUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await localStorageService.upload(
          file,
          "vehicles/insurance-files"
        );
        insuranceFilesUrls.push(result.url);
      }
    }

    const newInsurance = {
      insuranceStartDate,
      insuranceEndDate,
      isUnder24,
      insuranceCategory: "CarInsurance",
      insuranceType,
      insuranceCompany,
      agent,
      paymentMethod,
      insuranceAmount,
      paidAmount,
      insuranceFiles: insuranceFilesUrls,
    };

    vehicle.insurance.push(newInsurance);
    const findUser = await UserModel.findById(req.user._id);
    await vehicle.save();

    // Get the newly added insurance ID
    const addedInsurance = vehicle.insurance[vehicle.insurance.length - 1];

    // Create invoice automatically
    const remainingAmount = insuranceAmount - (paidAmount || 0);
    if (remainingAmount > 0) {
      const newInvoice = new Invoice({
        customer: vehicle.customerId,
        insurancePolicy: addedInsurance._id,
        vehicle: vehicleId,
        totalAmount: remainingAmount,
        balanceDue: remainingAmount,
        description: `${insuranceType} Insurance - ${insuranceCompany} - ${vehicle.plateNumber}`,
        notes: `Auto-generated invoice for insurance policy`,
        dueDate: new Date(insuranceEndDate),
        createdBy: req.user._id,
      });

      await newInvoice.save();
    }

    const message = `${findUser.name} add new insurance`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `add new insurance to vehicle ${findUser.name}`,
      entity: "Insurance",
      entityId: vehicleId,
      oldValue: null,
      newValue: newInsurance,
    });

    res.status(200).json({
      message: "Insurance added successfully",
      insurance: addedInsurance,
      invoiceCreated: remainingAmount > 0,
    });
  } catch (error) {
    console.error("Error adding insurance:", error);
    next(error);
  }
};

// Unified function to add insurance to vehicles in both collections
export const addInsuranceToVehicleUnified = async (req, res, next) => {
  const { vehicleId } = req.params;
  const {
    insuranceStartDate,
    insuranceEndDate,
    insuranceType,
    insuranceCompany,
    agent,
    paymentMethod,
    insuranceAmount,
    paidAmount,
    isUnder24,
  } = req.body;

  try {
    // First, try to find in the Vehicle collection
    let vehicle = await Vehicle.findById(vehicleId);
    let source = "Vehicle Collection";

    if (vehicle) {
      // Vehicle found in Vehicle collection
      const company = await InsuranceCompany.findOne({
        name: insuranceCompany,
      });
      if (!company) {
        return res
          .status(404)
          .json({ message: `Insurance company ${insuranceCompany} not found` });
      }

      let insuranceFilesUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await localStorageService.upload(
            file,
            "vehicles/insurance-files"
          );
          insuranceFilesUrls.push(result.url);
        }
      }

      // Map Arabic insurance types to English
      const getEnglishInsuranceType = (arabicType) => {
        const typeMap = {
          إلزامي: "Mandatory",
          "تأمين ثالث": "Third Party",
          "تأمين شامل": "Comprehensive",
          "تأمين خدمات الطرق": "Road Services",
          "إعفاء رسوم الحادث": "Accident Fee Exemption",
        };
        return typeMap[arabicType] || arabicType;
      };

      const englishInsuranceType = getEnglishInsuranceType(insuranceType);

      const newInsurance = {
        insuranceStartDate,
        insuranceEndDate,
        isUnder24,
        insuranceCategory: "CarInsurance",
        insuranceType: englishInsuranceType,
        insuranceCompany,
        agent,
        paymentMethod,
        insuranceAmount,
        paidAmount,
        insuranceFiles: insuranceFilesUrls,
      };

      vehicle.insurance.push(newInsurance);
      const findUser = await UserModel.findById(req.user._id);
      await vehicle.save();

      const addedInsurance = vehicle.insurance[vehicle.insurance.length - 1];

      // Create invoice automatically
      const remainingAmount = insuranceAmount - (paidAmount || 0);
      if (remainingAmount > 0) {
        const newInvoice = new Invoice({
          customer: vehicle.customerId,
          insurancePolicy: addedInsurance._id,
          vehicle: vehicleId,
          totalAmount: remainingAmount,
          balanceDue: remainingAmount,
          description: `${insuranceType} Insurance - ${insuranceCompany} - ${vehicle.plateNumber}`,
          notes: `Auto-generated invoice for insurance policy`,
          dueDate: new Date(insuranceEndDate),
          createdBy: req.user._id,
        });

        await newInvoice.save();
      }

      const message = `${findUser.name} add new insurance`;
      await sendNotificationLogic({
        senderId: req.user._id,
        message,
      });

      await logAudit({
        userId: req.user._id,
        userName: findUser.name,
        action: `add new insurance to vehicle ${findUser.name}`,
        entity: "Insurance",
        entityId: vehicleId,
        oldValue: null,
        newValue: newInsurance,
      });

      return res.status(200).json({
        message: "Insurance added successfully",
        insurance: addedInsurance,
        invoiceCreated: remainingAmount > 0,
        source: source,
      });
    }

    // If not found in Vehicle collection, search in customer vehicles
    const customer = await Customer.findOne({
      "vehicles._id": vehicleId,
    });

    if (customer) {
      const vehicleSubdoc = customer.vehicles.id(vehicleId);
      if (vehicleSubdoc) {
        source = "Customer Vehicles";

        const company = await InsuranceCompany.findOne({
          name: insuranceCompany,
        });
        if (!company) {
          return res.status(404).json({
            message: `Insurance company ${insuranceCompany} not found`,
          });
        }

        let insuranceFilesUrls = [];
        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            const result = await localStorageService.upload(
              file,
              "customers/insurance-files"
            );
            insuranceFilesUrls.push(result.url);
          }
        }

        // Map Arabic insurance types to English
        const getEnglishInsuranceType = (arabicType) => {
          const typeMap = {
            إلزامي: "Mandatory",
            "تأمين ثالث": "Third Party",
            "تأمين شامل": "Comprehensive",
            "تأمين خدمات الطرق": "Road Services",
            "إعفاء رسوم الحادث": "Accident Fee Exemption",
          };
          return typeMap[arabicType] || arabicType;
        };

        const englishInsuranceType = getEnglishInsuranceType(insuranceType);

        const newInsurance = {
          insuranceStartDate,
          insuranceEndDate,
          isUnder24,
          insuranceCategory: "CarInsurance",
          insuranceType: englishInsuranceType,
          insuranceCompany,
          agent,
          paymentMethod,
          insuranceAmount,
          paidAmount,
          insuranceFiles: insuranceFilesUrls,
        };

        vehicleSubdoc.insurance.push(newInsurance);
        const findUser = await UserModel.findById(req.user._id);
        await customer.save();

        const addedInsurance =
          vehicleSubdoc.insurance[vehicleSubdoc.insurance.length - 1];

        // Create invoice automatically
        const remainingAmount = insuranceAmount - (paidAmount || 0);
        if (remainingAmount > 0) {
          const newInvoice = new Invoice({
            customer: customer._id,
            insurancePolicy: addedInsurance._id,
            vehicle: vehicleId,
            totalAmount: remainingAmount,
            balanceDue: remainingAmount,
            description: `${insuranceType} Insurance - ${insuranceCompany} - ${vehicleSubdoc.plateNumber}`,
            notes: `Auto-generated invoice for insurance policy`,
            dueDate: new Date(insuranceEndDate),
            createdBy: req.user._id,
          });

          await newInvoice.save();
        }

        const message = `${findUser.name} add new insurance`;
        await sendNotificationLogic({
          senderId: req.user._id,
          message,
        });

        await logAudit({
          userId: req.user._id,
          userName: findUser.name,
          action: `add new insurance to vehicle ${findUser.name}`,
          entity: "Insurance",
          entityId: vehicleId,
          oldValue: null,
          newValue: newInsurance,
        });

        return res.status(200).json({
          message: "Insurance added successfully",
          insurance: addedInsurance,
          invoiceCreated: remainingAmount > 0,
          source: source,
        });
      }
    }

    return res.status(404).json({
      message: "Vehicle not found in any collection",
      vehicleId: vehicleId,
    });
  } catch (error) {
    console.error("Error adding insurance:", error);
    next(error);
  }
};

export const removeInsuranceFromVehicle = async (req, res, next) => {
  try {
    const { vehicleId, insuranceId } = req.params;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const insuranceIndex = findVehicle.insurance.findIndex(
      (insurance) => insurance._id.toString() === insuranceId
    );

    if (insuranceIndex === -1) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    findVehicle.insurance.splice(insuranceIndex, 1);
    const savedVehicle = await findVehicle.save();

    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} removed insurance from vehicle (${findVehicle.model} - ${findVehicle.plateNumber})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    return res.status(200).json({
      message: "Insurance removed successfully",
      vehicle: savedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const getInsurancesForVehicle = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({
      insurances: findVehicle.insurance,
    });
  } catch (error) {
    next(error);
  }
};

export const addCheckToInsurance = async (req, res, next) => {
  try {
    const { vehicleId, insuranceId } = req.params;
    const { checkNumber, checkDueDate, checkAmount } = req.body;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const insurance = findVehicle.insurance.find(
      (ins) => ins._id.toString() === insuranceId
    );

    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    let checkImage = null;
    if (req.file) {
      const result = await localStorageService.upload(
        req.file,
        "vehicles/checks"
      );
      checkImage = result.url;
    }

    const newCheck = {
      checkNumber,
      checkDueDate,
      checkAmount,
      isReturned: false,
      checkImage,
    };

    insurance.checkDetails.push(newCheck);
    const savedVehicle = await findVehicle.save();

    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} added check to insurance for vehicle (${findVehicle.model} - ${findVehicle.plateNumber})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    return res.status(201).json({
      message: "Check added successfully",
      vehicle: savedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const getInsuranceChecks = async (req, res, next) => {
  try {
    const { vehicleId, insuranceId } = req.params;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const insurance = findVehicle.insurance.find(
      (ins) => ins._id.toString() === insuranceId
    );

    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    return res.status(200).json({
      checks: insurance.checkDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllChecksForVehicle = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const allChecks = [];
    findVehicle.insurance.forEach((insurance) => {
      insurance.checkDetails.forEach((check) => {
        allChecks.push({
          insuranceId: insurance._id,
          insuranceType: insurance.insuranceType,
          check,
        });
      });
    });

    return res.status(200).json({
      checks: allChecks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCheckFromInsurance = async (req, res, next) => {
  try {
    const { vehicleId, insuranceId, checkId } = req.params;

    const findVehicle = await Vehicle.findById(vehicleId);
    if (!findVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const insurance = findVehicle.insurance.find(
      (ins) => ins._id.toString() === insuranceId
    );

    if (!insurance) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    const checkIndex = insurance.checkDetails.findIndex(
      (check) => check._id.toString() === checkId
    );

    if (checkIndex === -1) {
      return res.status(404).json({ message: "Check not found" });
    }

    insurance.checkDetails.splice(checkIndex, 1);
    const savedVehicle = await findVehicle.save();

    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} deleted check from insurance for vehicle (${findVehicle.model} - ${findVehicle.plateNumber})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    return res.status(200).json({
      message: "Check deleted successfully",
      vehicle: savedVehicle,
    });
  } catch (error) {
    next(error);
  }
};

export const findByPlate = async (req, res, next) => {
  try {
    const { plateNumber } = req.params;

    if (!plateNumber) {
      return res.status(400).json({ message: "Plate number is required" });
    }

    // Make request to external API
    const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5&q=${plateNumber}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(500).json({
        message: "Error fetching data from external API",
        error: `HTTP ${response.status}: ${response.statusText}`,
      });
    }

    const data = await response.json();

    if (
      !data.result ||
      !data.result.records ||
      data.result.records.length === 0
    ) {
      return res.status(404).json({
        message: "No vehicle found with this plate number",
        plateNumber,
      });
    }

    const record = data.result.records[0];

    // Extract specific fields as in the PHP code
    const selectedData = {
      tozeret_nm: record.tozeret_nm,
      tozeret_nm_he: record.tozeret_nm,
      shnat_yitzur: record.shnat_yitzur,
      degem_nm: record.degem_nm,
      ramat_gimur: record.ramat_gimur,
      mivchan_acharon_dt: record.mivchan_acharon_dt,
      tokef_dt: record.tokef_dt,
      baalut: record.baalut,
      baalut_he: record.baalut,
      tzeva_rechev: record.tzeva_rechev,
      tzeva_rechev_he: record.tzeva_rechev,
    };

    // Log the API call for audit purposes
    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `External API call for plate number ${plateNumber} by ${findUser.name}`,
      userName: findUser.name,
      entity: "Vehicle",
      entityId: null,
      oldValue: null,
      newValue: selectedData,
    });

    return res.status(200).json({
      message: "Vehicle information retrieved successfully",
      data: selectedData,
      plateNumber,
    });
  } catch (error) {
    console.error("Error in findByPlate:", error);
    return res.status(500).json({
      message: "Internal server error while fetching vehicle information",
      error: error.message,
    });
  }
};
