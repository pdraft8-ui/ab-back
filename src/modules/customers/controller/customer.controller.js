import localStorageService from "../../../Servicess/localStorage.js";
import Customer from "../../../../DB/models/Customer.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import InsuranceCompany from "../../../../DB/models/insuranceCompany.model.js";
import Invoice from "../../../../DB/models/Invoice.model.js";
import Vehicle from "../../../../DB/models/Vehicle.model.js";
//import { RoadServiceModel } from "../../../../DB/models/RoadService.model.js";
import mongoose from "mongoose";
import {
  createNotification,
  sendNotificationLogic,
} from "../../notification/controller/notification.controller.js";
import AuditLogModel from "../../../../DB/models/AuditLog.model.js";

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

const dropUniqueIndex = async () => {
  try {
    await mongoose.connection.db
      .collection("customers")
      .dropIndex("vehicles.plateNumber_1");
    console.log("Unique index dropped successfully.");
  } catch (error) {
    if (error.codeName !== "IndexNotFound") {
      console.error("Error dropping the index:", error);
    }
  }
};

export const addCustomer = async (req, res, next) => {
  const {
    first_name,
    last_name,
    id_Number,
    phone_number,
    joining_date,
    notes,
    vehicles,
    agentsName,
    city,
    email,
    birth_date,
  } = req.body;

  try {
    await dropUniqueIndex();

    const existingCustomer = await Customer.findOne({ id_Number });
    if (existingCustomer)
      return res.status(409).json({ message: "Customer already exists" });
    let imageUrl = null;

    if (req.file) {
      // Upload image using local storage service
      const result = await localStorageService.upload(
        req.file,
        "customers/images"
      );
      imageUrl = result.url;
    } else {
      // Default image with full URL
      imageUrl = localStorageService.getFullUrl(
        "/uploads/defaults/default-customer.jpg"
      );
    }

    const validVehicles =
      vehicles && vehicles.length > 0
        ? vehicles.map((vehicle) => ({
            plateNumber: vehicle.plateNumber || "غير معروف",
            model: vehicle.model,
            type: vehicle.type,
            ownership: vehicle.ownership,
            modelNumber: vehicle.modelNumber,
            licenseExpiry: vehicle.licenseExpiry,
            lastTest: vehicle.lastTest,
            color: vehicle.color,
            price: vehicle.price,
            image:
              vehicle.image ||
              "https://th.bing.com/th/id/OIP.eUdZe6jPSNXtNAbxcswuIgHaE8?w=4245&h=2830&rs=1&pid=ImgDetMain",
            insurance: vehicle.insurance || [],
          }))
        : [];

    let agent = null;
    if (agentsName) {
      agent = await UserModel.findOne({ name: agentsName });
    }

    const newCustomer = new Customer({
      first_name,
      last_name,
      city,
      id_Number,
      phone_number,
      joining_date,
      notes,
      image: imageUrl,
      vehicles: validVehicles,
      agentsName: agentsName || null,
      agentsId: agent ? agent._id : null,
      email,
      birth_date,
    });

    const savedCustomer = await newCustomer.save();
    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} add new customer(${first_name} ${last_name})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      action: `Add Customer by ${findUser.name}`,
      userName: findUser.name,
      entity: "Customer",
      entityId: savedCustomer._id,
      oldValue: null,
      newValue: savedCustomer.toObject(),
    });

    // Convert saved customer to include full URLs
    const customerWithFullUrls = convertCustomerToFullUrls(savedCustomer);

    return res.status(201).json({
      message: "Added successfully",
      savedCustomer: customerWithFullUrls,
    });
  } catch (error) {
    console.error("Error adding customer:", error);
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findCustomer = await Customer.findById(id);
    if (!findCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);
    const findUser = await UserModel.findById(req.user._id);

    const message = `${findUser.name} delete${findCustomer.first_name} ${findCustomer.last_name})`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: req.user._id,
      action: `Delete Customer by ${findUser.name}`,
      userName: findUser.name,
      entity: "Customer",
      entityId: deletedCustomer._id,
      oldValue: findCustomer.toObject(),
      newValue: null,
    });

    return res.status(200).json({
      message: "Deleted successfully",
      deletedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllVehicleInsurances = async (req, res, next) => {
  try {
    const allInsurances = await Customer.aggregate([
      {
        $unwind: "$vehicles",
      },
      {
        $unwind: "$vehicles.insurance",
      },
      {
        $project: {
          _id: "$vehicles.insurance._id",
          insuranceStartDate: "$vehicles.insurance.insuranceStartDate",
          insuranceEndDate: "$vehicles.insurance.insuranceEndDate",
          isUnder24: "$vehicles.insurance.isUnder24",
          insuranceCategory: "$vehicles.insurance.insuranceCategory",
          insuranceType: "$vehicles.insurance.insuranceType",
          insuranceCompany: "$vehicles.insurance.insuranceCompany",
          agent: "$vehicles.insurance.agent",
          paymentMethod: "$vehicles.insurance.paymentMethod",
          insuranceAmount: "$vehicles.insurance.insuranceAmount",
          paidAmount: "$vehicles.insurance.paidAmount",
          remainingDebt: "$vehicles.insurance.remainingDebt",
          insuranceFiles: "$vehicles.insurance.insuranceFiles",
        },
      },
    ]);

    // Convert insurance files to full URLs
    const insurancesWithFullUrls = allInsurances.map((insurance) => ({
      ...insurance,
      insuranceFiles: localStorageService.getFullUrls(
        insurance.insuranceFiles || []
      ),
    }));

    return res.status(200).json({
      message: "All vehicle insurances retrieved successfully",
      data: insurancesWithFullUrls,
    });
  } catch (error) {
    console.error("Error retrieving all vehicle insurances:", error);
    next(error);
  }
};

// Get all insurances data for all types and categories
export const getAllInsurancesData = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 50,
      insuranceType,
      insuranceCategory,
      status,
    } = req.query;

    // Build match conditions
    const matchConditions = {};
    if (insuranceType) matchConditions.insuranceType = insuranceType;
    if (insuranceCategory)
      matchConditions.insuranceCategory = insuranceCategory;
    if (status) matchConditions.policyStatus = status;

    // Get customer insurances (non-vehicle)
    const customerInsurances = await Customer.aggregate([
      {
        $unwind: "$insurances",
      },
      {
        $match: matchConditions,
      },
      {
        $project: {
          _id: "$insurances._id",
          source: "Customer Insurance",
          customerId: "$_id",
          customerName: { $concat: ["$first_name", " ", "$last_name"] },
          customerPhone: "$phone_number",
          customerEmail: "$email",
          insuranceType: "$insurances.insuranceType",
          policyNumber: "$insurances.policyNumber",
          issueDate: "$insurances.issueDate",
          expirationDate: "$insurances.expirationDate",
          insuranceAmount: "$insurances.insuranceAmount",
          premiumAmount: "$insurances.premiumAmount",
          premiumFrequency: "$insurances.premiumFrequency",
          premiumPaymentMethod: "$insurances.premiumPaymentMethod",
          policyStatus: "$insurances.policyStatus",
          coverageDetails: "$insurances.coverageDetails",
          insuranceCompany: "$insurances.insuranceCompany",
          agent: "$insurances.agent",
          beneficiaries: "$insurances.beneficiaries",
          insuranceFiles: "$insurances.insuranceFiles",
          notes: "$insurances.notes",
          createdAt: "$insurances.createdAt",
          updatedAt: "$insurances.updatedAt",
        },
      },
    ]);

    // Get vehicle insurances
    const vehicleInsurances = await Customer.aggregate([
      {
        $unwind: "$vehicles",
      },
      {
        $unwind: "$vehicles.insurance",
      },
      {
        $match: matchConditions,
      },
      {
        $project: {
          _id: "$vehicles.insurance._id",
          source: "Vehicle Insurance",
          customerId: "$_id",
          customerName: { $concat: ["$first_name", " ", "$last_name"] },
          customerPhone: "$phone_number",
          customerEmail: "$email",
          vehicleId: "$vehicles._id",
          plateNumber: "$vehicles.plateNumber",
          vehicleModel: "$vehicles.model",
          vehicleType: "$vehicles.type",
          insuranceType: "$vehicles.insurance.insuranceType",
          insuranceCategory: "$vehicles.insurance.insuranceCategory",
          insuranceStartDate: "$vehicles.insurance.insuranceStartDate",
          insuranceEndDate: "$vehicles.insurance.insuranceEndDate",
          isUnder24: "$vehicles.insurance.isUnder24",
          insuranceCompany: "$vehicles.insurance.insuranceCompany",
          agent: "$vehicles.insurance.agent",
          paymentMethod: "$vehicles.insurance.paymentMethod",
          insuranceAmount: "$vehicles.insurance.insuranceAmount",
          paidAmount: "$vehicles.insurance.paidAmount",
          remainingDebt: "$vehicles.insurance.remainingDebt",
          insuranceFiles: "$vehicles.insurance.insuranceFiles",
          checkDetails: "$vehicles.insurance.checkDetails",
          createdAt: "$vehicles.insurance.createdAt",
          updatedAt: "$vehicles.insurance.updatedAt",
        },
      },
    ]);

    // Combine all insurances
    const allInsurances = [...customerInsurances, ...vehicleInsurances];

    // Convert file URLs to full URLs
    const insurancesWithFullUrls = allInsurances.map((insurance) => ({
      ...insurance,
      insuranceFiles: localStorageService.getFullUrls(
        insurance.insuranceFiles || []
      ),
      checkDetails: insurance.checkDetails
        ? insurance.checkDetails.map((check) => ({
            ...check,
            checkImage: check.checkImage
              ? localStorageService.getFullUrl(check.checkImage)
              : null,
          }))
        : [],
    }));

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedInsurances = insurancesWithFullUrls.slice(
      startIndex,
      endIndex
    );

    // Calculate statistics
    const totalInsurances = allInsurances.length;
    const totalPages = Math.ceil(totalInsurances / limit);

    const statistics = {
      totalInsurances,
      customerInsurances: customerInsurances.length,
      vehicleInsurances: vehicleInsurances.length,
      totalPages,
      currentPage: parseInt(page),
      insurancesPerPage: parseInt(limit),
    };

    // Group by insurance type
    const byInsuranceType = allInsurances.reduce((acc, insurance) => {
      const type = insurance.insuranceType || "Unknown";
      if (!acc[type]) acc[type] = [];
      acc[type].push(insurance);
      return acc;
    }, {});

    // Group by insurance category
    const byInsuranceCategory = allInsurances.reduce((acc, insurance) => {
      const category =
        insurance.insuranceCategory || insurance.source || "Unknown";
      if (!acc[category]) acc[category] = [];
      acc[category].push(insurance);
      return acc;
    }, {});

    return res.status(200).json({
      message: "All insurances data retrieved successfully",
      data: {
        insurances: paginatedInsurances,
        statistics,
        summary: {
          byInsuranceType,
          byInsuranceCategory,
        },
      },
    });
  } catch (error) {
    console.error("Error retrieving all insurances data:", error);
    next(error);
  }
};

// Helper function to convert customer data to include full URLs
const convertCustomerToFullUrls = (customer) => {
  const customerObj = customer.toObject ? customer.toObject() : customer;

  // Convert customer image to full URL
  if (customerObj.image) {
    customerObj.image = localStorageService.getFullUrl(customerObj.image);
  }

  // Convert vehicle images and insurance files to full URLs
  if (customerObj.vehicles && Array.isArray(customerObj.vehicles)) {
    customerObj.vehicles = customerObj.vehicles.map((vehicle) => {
      const vehicleObj = vehicle.toObject ? vehicle.toObject() : vehicle;

      // Convert vehicle image
      if (vehicleObj.image) {
        vehicleObj.image = localStorageService.getFullUrl(vehicleObj.image);
      }

      // Convert insurance files
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
            insuranceObj.checkDetails = insuranceObj.checkDetails.map(
              (check) => {
                const checkObj = check.toObject ? check.toObject() : check;
                if (checkObj.checkImage) {
                  checkObj.checkImage = localStorageService.getFullUrl(
                    checkObj.checkImage
                  );
                }
                return checkObj;
              }
            );
          }

          return insuranceObj;
        });
      }

      return vehicleObj;
    });
  }

  // Convert customer insurance files
  if (customerObj.insurances && Array.isArray(customerObj.insurances)) {
    customerObj.insurances = customerObj.insurances.map((insurance) => {
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

      return insuranceObj;
    });
  }

  return customerObj;
};

export const allCustomer = async (req, res, next) => {
  try {
    const customerList = await Customer.find({});

    // Convert all customers to include full URLs
    const customersWithFullUrls = customerList.map((customer) =>
      convertCustomerToFullUrls(customer)
    );

    return res
      .status(200)
      .json({ message: "All Customers", customerList: customersWithFullUrls });
  } catch (error) {
    next(error);
  }
};

export const showById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    // Convert customer to include full URLs
    const customerWithFullUrls = convertCustomerToFullUrls(customer);

    return res
      .status(200)
      .json({ message: "Found Customer", customer: customerWithFullUrls });
  } catch (error) {
    next(error);
  }
};

export const getTotalCustomerCount = async (req, res, next) => {
  try {
    const total = await Customer.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    console.error("Error getting total customer count:", error);
    next(error);
  }
};

export const getCustomerByMonth = async (req, res, next) => {
  try {
    const monthlyCounts = await Customer.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$joining_date" },
            month: { $month: "$joining_date" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ data: monthlyCounts });
  } catch (error) {
    console.error("Error getting customer by month:", error);
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    id_Number,
    phone_number,
    joining_date,
    notes,
    city,
    birth_date,
  } = req.body;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(409).json({ message: "Customer not found" });
    }

    const oldValue = customer.toObject(); // الاحتفاظ بالقيمة القديمة

    let updatedData = {
      first_name,
      last_name,
      id_Number,
      phone_number,
      joining_date,
      notes,
      city,
      birth_date,
    };

    if (req.file) {
      updatedData.image = `/uploads/Customer/images/${req.file.filename}`;
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const findUser = await UserModel.findById(req.user._id);
    await logAudit({
      userId: req.user._id,
      action: `Update customer by ${findUser.name}`,
      userName: findUser.name,
      entity: "Customer",
      entityId: updatedCustomer._id,
      oldValue,
      newValue: updatedCustomer.toObject(),
    });

    return res.status(200).json({
      message: "Updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

export const addVehicle = async (req, res, next) => {
  try {
    const { customerId } = req.params;
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

    let secure_url = "";

    if (req.file) {
      secure_url = `/uploads/Vehicles/images/${req.file.filename}`;
    }
    const newVehicle = {
      plateNumber: plateNumber || "غير معروف",
      model,
      type,
      ownership,
      modelNumber,
      licenseExpiry,
      lastTest,
      color,
      price,
      image: secure_url,
      insurance: [],
    };

    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    customer.vehicles.push(newVehicle);
    await customer.save();
    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} add new car , the plate number is ${plateNumber}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `add new vehicles by ${findUser.name}`,
      entity: "Vehicle",
      entityId: customerId,
      oldValue: null,
      newValue: newVehicle,
    });

    return res.status(200).json({ message: "Vehicle added successfully" });
  } catch (error) {
    next(error);
  }
};

export const removeVehicle = async (req, res, next) => {
  try {
    const { customerId, vehicleId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    // ابحث عن المركبة قبل حذفها لتسجلها
    const vehicleToRemove = customer.vehicles.find(
      (v) => v._id.toString() === vehicleId
    );

    if (!vehicleToRemove)
      return res.status(404).json({ message: "Vehicle not found" });

    // إزالة المركبة
    customer.vehicles.pull({ _id: vehicleId });
    await customer.save();
    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} delete car , the plate number is ${vehicleToRemove.plateNumber}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `delete vehicles by ${findUser.name}`,
      entity: "Vehicle",
      entityId: customerId,
      oldValue: vehicleToRemove,
      newValue: null,
    });

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (req, res, next) => {
  const { customerId, vehicleId } = req.params;
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

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // نسخة قديمة قبل التعديل
    const oldValue = { ...vehicle._doc };

    // تحديث القيم
    vehicle.plateNumber = plateNumber || vehicle.plateNumber;
    vehicle.model = model || vehicle.model;
    vehicle.type = type || vehicle.type;
    vehicle.ownership = ownership || vehicle.ownership;
    vehicle.modelNumber = modelNumber || vehicle.modelNumber;
    vehicle.licenseExpiry = licenseExpiry || vehicle.licenseExpiry;
    vehicle.lastTest = lastTest || vehicle.lastTest;
    vehicle.color = color || vehicle.color;
    vehicle.price = price || vehicle.price;

    await customer.save();

    // نسخة جديدة بعد التعديل
    const newValue = { ...vehicle._doc };
    const findUser = await UserModel.findById(req.user._id);

    // 📝 تسجيل الحدث
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Update vehicle by ${findUser.name}`,
      entity: "Vehicle",
      entityId: customerId,
      oldValue,
      newValue,
    });

    return res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCustomerVehicles = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id).select("vehicles");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ vehicles: customer.vehicles });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const removeInsuranceFromVehicle = async (req, res, next) => {
  const { customerId, vehicleId, insuranceId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const insuranceIndex = vehicle.insurance.findIndex(
      (ins) => ins._id.toString() === insuranceId
    );

    if (insuranceIndex === -1) {
      return res.status(404).json({ message: "Insurance not found" });
    }

    vehicle.insurance.splice(insuranceIndex, 1);

    await customer.save();

    const adminUser = await UserModel.findOne({ role: "admin" });
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const senderId = req.user ? req.user._id : null;
    if (!senderId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const adminNotificationMessage = `The insurance for vehicle number has been deleted.${vehicleId}`;
    await createNotification(adminUser._id, senderId, adminNotificationMessage);
    const findUser = await UserModel.findById(req.user._id);
    const message = `${findUser.name} delete insurance`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Delete insurance by ${findUser.name}`,
      entity: "Insurance",
      entityId: vehicleId,
      oldValue: null,
      newValue: null,
    });

    return res.status(200).json({ message: "delete success" });
  } catch (error) {
    console.error("Error removing insurance:", error);
    next(error);
  }
};

export const addInsuranceToVehicle = async (req, res, next) => {
  const { customerId, vehicleId } = req.params;
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
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const vehicle = customer.vehicles.id(vehicleId);
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
        // Replace Cloudinary upload logic with local file storage
        insuranceFilesUrls.push(
          `/uploads/Customer/InsuranceFiles/${file.filename}`
        );
      }
    }

    const newInsurance = {
      insuranceStartDate,
      insuranceEndDate,
      isUnder24,
      insuranceCategory: "تأمين سيارات",
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
    await customer.save();

    // Get the newly added insurance ID
    const addedInsurance = vehicle.insurance[vehicle.insurance.length - 1];

    // Create invoice automatically
    const remainingAmount = insuranceAmount - (paidAmount || 0);
    if (remainingAmount > 0) {
      const newInvoice = new Invoice({
        customer: customerId,
        insurancePolicy: addedInsurance._id,
        vehicle: vehicleId,
        totalAmount: remainingAmount,
        balanceDue: remainingAmount,
        description: `${insuranceType} Insurance - ${insuranceCompany} - ${vehicle.plateNumber}`,
        notes: `Auto-generated invoice for insurance policy`,
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

export const getInsurancesForVehicle = async (req, res, next) => {
  const { customerId, vehicleId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Debug: Log customer vehicles
    console.log(
      "Customer vehicles:",
      customer.vehicles.map((v) => ({
        id: v._id.toString(),
        plateNumber: v.plateNumber,
      }))
    );
    console.log("Looking for vehicle ID:", vehicleId);

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) {
      // Try alternative lookup methods
      const vehicleByString = customer.vehicles.find(
        (v) => v._id.toString() === vehicleId
      );
      if (vehicleByString) {
        const insurances = vehicleByString.insurance;
        return res.status(200).json({ insurances });
      }

      return res.status(404).json({
        message: "Vehicle not found",
        debug: {
          customerId,
          vehicleId,
          availableVehicleIds: customer.vehicles.map((v) => v._id.toString()),
          vehicleCount: customer.vehicles.length,
        },
      });
    }

    const insurances = vehicle.insurance;

    res.status(200).json({ insurances });
  } catch (error) {
    console.error("Error retrieving insurances:", error);
    next(error);
  }
};

export const addCheckToInsurance = async (req, res, next) => {
  const { customerId, vehicleId, insuranceId } = req.params;
  const { checkNumber, checkDueDate, checkAmount, isReturned } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const insurance = vehicle.insurance.id(insuranceId);
    if (!insurance)
      return res.status(404).json({ message: "Insurance not found" });

    let checkImageUrl = null;
    if (req.file) {
      const result = await localStorageService.upload(req.file, "checks");
      checkImageUrl = result.url;
    }

    const newCheck = {
      checkNumber,
      checkDueDate,
      checkAmount,
      isReturned,
      checkImage: checkImageUrl,
    };

    insurance.checkDetails.push(newCheck);
    insurance.paidAmount += checkAmount;
    insurance.remainingDebt = insurance.insuranceAmount - insurance.paidAmount;
    const findUser = await UserModel.findById(req.user._id);
    await customer.save();
    const message = `${findUser.name} add new check details ${checkNumber}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Add check by ${findUser.name}`,
      entity: "Check",
      entityId: insuranceId,
      oldValue: null,
      newValue: {
        addedCheck: newCheck,
        paidAmount: insurance.paidAmount,
        remainingDebt: insurance.remainingDebt,
      },
    });

    res.status(200).json({ message: "Check added successfully", insurance });
  } catch (error) {
    console.error("Error adding check:", error);
    next(error);
  }
};

export const getInsuranceChecks = async (req, res, next) => {
  const { customerId, vehicleId, insuranceId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const insurance = vehicle.insurance.id(insuranceId);
    if (!insurance)
      return res.status(404).json({ message: "Insurance not found" });

    res.status(200).json({
      message: "Check details fetched successfully",
      checks: insurance.checkDetails,
    });
  } catch (error) {
    console.error("Error fetching check details:", error);
    next(error);
  }
};

export const getAllChecksForVehicle = async (req, res, next) => {
  const { customerId, vehicleId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    let allChecks = [];

    vehicle.insurance.forEach((insurance) => {
      if (insurance.checkDetails && insurance.checkDetails.length > 0) {
        insurance.checkDetails.forEach((check) => {
          allChecks.push({
            ...check.toObject(),
            insuranceId: insurance._id,
            insuranceType: insurance.insuranceType,
            insuranceCompany: insurance.insuranceCompany,
          });
        });
      }
    });

    res.status(200).json({
      message: "All checks for the vehicle retrieved successfully",
      checks: allChecks,
    });
  } catch (error) {
    console.error("Error fetching checks for vehicle:", error);
    next(error);
  }
};

export const deleteCheckFromInsurance = async (req, res, next) => {
  const { customerId, vehicleId, insuranceId, checkId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const vehicle = customer.vehicles.id(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const insurance = vehicle.insurance.id(insuranceId);
    if (!insurance)
      return res.status(404).json({ message: "Insurance not found" });

    const checkIndex = insurance.checkDetails.findIndex(
      (check) => check._id.toString() === checkId
    );
    if (checkIndex === -1)
      return res.status(404).json({ message: "Check not found" });

    const removedCheck = insurance.checkDetails[checkIndex];
    insurance.paidAmount -= removedCheck.checkAmount;
    insurance.remainingDebt = insurance.insuranceAmount - insurance.paidAmount;

    insurance.checkDetails.splice(checkIndex, 1);
    const findUser = await UserModel.findById(req.user._id);
    await customer.save();
    const message = `${findUser.name} delete check `;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });
    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Delete check by ${findUser.name}`,
      entity: "Check",
      entityId: checkId,
      oldValue: null,
      newValue: null,
    });

    res.status(200).json({ message: "Check deleted successfully" });
  } catch (error) {
    console.error("Error deleting check:", error);
    next(error);
  }
};

// Get comprehensive insurances for a specific customer including all types
export const getCustomerInsurances = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Get all vehicle insurances from customer vehicles
    const vehicleInsurances = await Customer.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(customerId) },
      },
      {
        $unwind: "$vehicles",
      },
      {
        $unwind: "$vehicles.insurance",
      },
      {
        $project: {
          _id: "$vehicles.insurance._id",
          insuranceType: "Vehicle Insurance",
          vehicleId: "$vehicles._id",
          plateNumber: "$vehicles.plateNumber",
          model: "$vehicles.model",
          type: "$vehicles.type",
          ownership: "$vehicles.ownership",
          modelNumber: "$vehicles.modelNumber",
          color: "$vehicles.color",
          price: "$vehicles.price",
          vehicleImage: "$vehicles.image",
          insuranceStartDate: "$vehicles.insurance.insuranceStartDate",
          insuranceEndDate: "$vehicles.insurance.insuranceEndDate",
          isUnder24: "$vehicles.insurance.isUnder24",
          insuranceCategory: "$vehicles.insurance.insuranceCategory",
          insuranceSubType: "$vehicles.insurance.insuranceType",
          insuranceCompany: "$vehicles.insurance.insuranceCompany",
          agent: "$vehicles.insurance.agent",
          paymentMethod: "$vehicles.insurance.paymentMethod",
          insuranceAmount: "$vehicles.insurance.insuranceAmount",
          paidAmount: "$vehicles.insurance.paidAmount",
          remainingDebt: "$vehicles.insurance.remainingDebt",
          insuranceFiles: "$vehicles.insurance.insuranceFiles",
          checkDetails: "$vehicles.insurance.checkDetails",
          createdAt: "$vehicles.insurance.createdAt",
          updatedAt: "$vehicles.insurance.updatedAt",
          source: "Customer Vehicles",
        },
      },
    ]);

    // Get standalone vehicle insurances from Vehicle collection
    const standaloneVehicleInsurances = await Vehicle.aggregate([
      {
        $match: { customerId: new mongoose.Types.ObjectId(customerId) },
      },
      {
        $unwind: "$insurance",
      },
      {
        $project: {
          _id: "$insurance._id",
          insuranceType: "Vehicle Insurance",
          vehicleId: "$_id",
          plateNumber: "$plateNumber",
          model: "$model",
          type: "$type",
          ownership: "$ownership",
          modelNumber: "$modelNumber",
          color: "$color",
          price: "$price",
          vehicleImage: "$image",
          insuranceStartDate: "$insurance.insuranceStartDate",
          insuranceEndDate: "$insurance.insuranceEndDate",
          isUnder24: "$insurance.isUnder24",
          insuranceCategory: "$insurance.insuranceCategory",
          insuranceSubType: "$insurance.insuranceType",
          insuranceCompany: "$insurance.insuranceCompany",
          agent: "$insurance.agent",
          paymentMethod: "$insurance.paymentMethod",
          insuranceAmount: "$insurance.insuranceAmount",
          paidAmount: "$insurance.paidAmount",
          remainingDebt: "$insurance.remainingDebt",
          insuranceFiles: "$insurance.insuranceFiles",
          checkDetails: "$insurance.checkDetails",
          createdAt: "$insurance.createdAt",
          updatedAt: "$insurance.updatedAt",
          source: "Vehicle Collection",
        },
      },
    ]);

    // Combine all insurances
    const allInsurances = [
      ...vehicleInsurances,
      ...standaloneVehicleInsurances,
    ];

    // Group insurances by category and type
    const insurancesByCategory = {};
    const insurancesByType = {};

    allInsurances.forEach((insurance) => {
      const category = insurance.insuranceCategory || "Uncategorized";
      const type = insurance.insuranceType || "Other";

      // Group by category
      if (!insurancesByCategory[category]) {
        insurancesByCategory[category] = [];
      }
      insurancesByCategory[category].push(insurance);

      // Group by type
      if (!insurancesByType[type]) {
        insurancesByType[type] = [];
      }
      insurancesByType[type].push(insurance);
    });

    // Calculate summary statistics
    const totalInsurances = allInsurances.length;
    const totalAmount = allInsurances.reduce(
      (sum, ins) => sum + (ins.insuranceAmount || 0),
      0
    );
    const totalPaid = allInsurances.reduce(
      (sum, ins) => sum + (ins.paidAmount || 0),
      0
    );
    const totalRemaining = allInsurances.reduce(
      (sum, ins) => sum + (ins.remainingDebt || 0),
      0
    );

    // Get unique categories, types, and companies
    const categories = Object.keys(insurancesByCategory);
    const insuranceTypes = Object.keys(insurancesByType);
    const insuranceCompanies = [
      ...new Set(
        allInsurances.map((ins) => ins.insuranceCompany).filter(Boolean)
      ),
    ];
    const insuranceSubTypes = [
      ...new Set(
        allInsurances.map((ins) => ins.insuranceSubType).filter(Boolean)
      ),
    ];

    // Get vehicle summary
    const vehicleSummary = {
      totalVehicles: customer.vehicles.length,
      vehiclesWithInsurance: customer.vehicles.filter(
        (v) => v.insurance && v.insurance.length > 0
      ).length,
      vehiclesWithoutInsurance: customer.vehicles.filter(
        (v) => !v.insurance || v.insurance.length === 0
      ).length,
    };

    return res.status(200).json({
      message: "Customer insurances retrieved successfully",
      customer: {
        _id: customer._id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone_number: customer.phone_number,
        email: customer.email,
        city: customer.city,
        joining_date: customer.joining_date,
        agentsName: customer.agentsName,
      },
      summary: {
        totalInsurances,
        totalAmount,
        totalPaid,
        totalRemaining,
        categories: categories.length,
        insuranceTypes: insuranceTypes.length,
        insuranceCompanies: insuranceCompanies.length,
        insuranceSubTypes: insuranceSubTypes.length,
        vehicleSummary,
      },
      categories: categories,
      insuranceTypes: insuranceTypes,
      insuranceCompanies: insuranceCompanies,
      insuranceSubTypes: insuranceSubTypes,
      insurancesByCategory: insurancesByCategory,
      insurancesByType: insurancesByType,
      allInsurances: allInsurances,
      sources: {
        customerVehicles: vehicleInsurances.length,
        vehicleCollection: standaloneVehicleInsurances.length,
      },
    });
  } catch (error) {
    console.error("Error retrieving customer insurances:", error);
    next(error);
  }
};

// Add different types of insurance to customer (not vehicle-specific)
export const addCustomerInsurance = async (req, res, next) => {
  const { customerId } = req.params;
  const {
    insuranceType,
    policyNumber,
    issueDate,
    expirationDate,
    insuranceAmount,
    premiumAmount,
    premiumFrequency,
    premiumPaymentMethod,
    policyStatus,
    coverageDetails,
    insuranceCompany,
    agent,
    beneficiaries,
    notes,
  } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate required fields
    if (
      !insuranceType ||
      !policyNumber ||
      !issueDate ||
      !expirationDate ||
      !insuranceAmount ||
      !premiumAmount ||
      !premiumFrequency ||
      !premiumPaymentMethod ||
      !coverageDetails ||
      !insuranceCompany
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide: insuranceType, policyNumber, issueDate, expirationDate, insuranceAmount, premiumAmount, premiumFrequency, premiumPaymentMethod, coverageDetails, insuranceCompany",
      });
    }

    // Validate insurance type
    const validInsuranceTypes = [
      "Health Insurance",
      "Life Insurance",
      "Property Insurance",
      "Travel Insurance",
      "Civil Liability Insurance",
      "Corporate Insurance",
    ];

    if (!validInsuranceTypes.includes(insuranceType)) {
      return res.status(400).json({
        message: `Invalid insurance type. Must be one of: ${validInsuranceTypes.join(
          ", "
        )}`,
      });
    }

    // Validate premium frequency
    const validFrequencies = ["Monthly", "Quarterly", "Semi-Annual", "Annual"];
    if (!validFrequencies.includes(premiumFrequency)) {
      return res.status(400).json({
        message: `Invalid premium frequency. Must be one of: ${validFrequencies.join(
          ", "
        )}`,
      });
    }

    // Validate payment method
    const validPaymentMethods = ["cash", "card", "check", "bank_transfer"];
    if (!validPaymentMethods.includes(premiumPaymentMethod)) {
      return res.status(400).json({
        message: `Invalid payment method. Must be one of: ${validPaymentMethods.join(
          ", "
        )}`,
      });
    }

    // Validate dates
    if (new Date(issueDate) >= new Date(expirationDate)) {
      return res.status(400).json({
        message: "Expiration date must be after issue date",
      });
    }

    // Validate insurance company (by ID or name)
    let company;
    if (mongoose.Types.ObjectId.isValid(insuranceCompany)) {
      // If it's a valid ObjectId, search by ID
      company = await InsuranceCompany.findById(insuranceCompany);
    } else {
      // Otherwise, search by name
      company = await InsuranceCompany.findOne({ name: insuranceCompany });
    }

    if (!company) {
      return res
        .status(404)
        .json({ message: `Insurance company ${insuranceCompany} not found` });
    }

    // Handle file uploads
    let insuranceFilesUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Replace Cloudinary upload logic with local file storage
        insuranceFilesUrls.push(
          `/uploads/Customer/InsuranceFiles/${file.filename}`
        );
      }
    }

    // Create new insurance object
    const newInsurance = {
      _id: new mongoose.Types.ObjectId(),
      insuranceType,
      policyNumber,
      issueDate,
      expirationDate,
      insuranceAmount,
      premiumAmount,
      premiumFrequency,
      premiumPaymentMethod,
      policyStatus: policyStatus || "Active",
      coverageDetails,
      insuranceCompany: company.name, // Store the company name for consistency
      agent,
      beneficiaries: beneficiaries
        ? Array.isArray(beneficiaries)
          ? beneficiaries
          : [beneficiaries]
        : [],
      insuranceFiles: insuranceFilesUrls,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add insurance to customer
    if (!customer.insurances) {
      customer.insurances = [];
    }
    customer.insurances.push(newInsurance);

    const findUser = await UserModel.findById(req.user._id);
    await customer.save();

    // Create invoice automatically for the premium amount
    let invoiceCreated = false;
    if (premiumAmount > 0) {
      const newInvoice = new Invoice({
        customer: customerId,
        insurancePolicy: newInsurance._id,
        totalAmount: premiumAmount,
        balanceDue: premiumAmount,
        description: `${insuranceType} Insurance - ${company.name}`,
        notes: `Auto-generated invoice for ${insuranceType} insurance policy`,
        dueDate: new Date(expirationDate),
        createdBy: req.user._id,
        // Note: vehicle field is not included for customer insurances
      });

      await newInvoice.save();
      invoiceCreated = true;
    }

    const message = `${findUser.name} added new ${insuranceType} insurance for ${customer.first_name} ${customer.last_name}`;
    await sendNotificationLogic({
      senderId: req.user._id,
      message,
    });

    await logAudit({
      userId: req.user._id,
      userName: findUser.name,
      action: `Add ${insuranceType} Insurance by ${findUser.name}`,
      entity: "Customer Insurance",
      entityId: newInsurance._id,
      oldValue: null,
      newValue: newInsurance,
    });

    return res.status(201).json({
      message: `${insuranceType} insurance added successfully`,
      insurance: newInsurance,
      invoiceCreated,
      customer: {
        _id: customer._id,
        first_name: customer.first_name,
        last_name: customer.last_name,
      },
    });
  } catch (error) {
    console.error("Error adding customer insurance:", error);
    next(error);
  }
};

// Get all customer insurances (including non-vehicle insurances)
export const getAllCustomerInsurances = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Get vehicle insurances from customer vehicles
    const vehicleInsurances = await Customer.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(customerId) },
      },
      {
        $unwind: "$vehicles",
      },
      {
        $unwind: "$vehicles.insurance",
      },
      {
        $project: {
          _id: "$vehicles.insurance._id",
          insuranceType: "Vehicle Insurance",
          insuranceCategory: "$vehicles.insurance.insuranceCategory",
          insuranceSubType: "$vehicles.insurance.insuranceType",
          vehicleId: "$vehicles._id",
          plateNumber: "$vehicles.plateNumber",
          model: "$vehicles.model",
          insuranceCompany: "$vehicles.insurance.insuranceCompany",
          agent: "$vehicles.insurance.agent",
          issueDate: "$vehicles.insurance.insuranceStartDate",
          expirationDate: "$vehicles.insurance.insuranceEndDate",
          insuranceStartDate: "$vehicles.insurance.insuranceStartDate",
          insuranceEndDate: "$vehicles.insurance.insuranceEndDate",
          paymentMethod: "$vehicles.insurance.paymentMethod",
          premiumPaymentMethod: "$vehicles.insurance.paymentMethod",
          insuranceAmount: "$vehicles.insurance.insuranceAmount",
          premiumAmount: "$vehicles.insurance.insuranceAmount",
          paidAmount: "$vehicles.insurance.paidAmount",
          remainingDebt: "$vehicles.insurance.remainingDebt",
          policyStatus: {
            $cond: {
              if: {
                $gte: ["$vehicles.insurance.insuranceEndDate", new Date()],
              },
              then: "Active",
              else: "Expired",
            },
          },
          coverageDetails: "Vehicle insurance coverage",
          insuranceFiles: "$vehicles.insurance.insuranceFiles",
          checkDetails: "$vehicles.insurance.checkDetails",
          beneficiaries: [],
          notes: "",
          createdAt: "$vehicles.insurance.createdAt",
          updatedAt: "$vehicles.insurance.updatedAt",
          source: "Customer Vehicles",
        },
      },
    ]);

    // Get standalone vehicle insurances from Vehicle collection
    const standaloneVehicleInsurances = await Vehicle.aggregate([
      {
        $match: { customerId: new mongoose.Types.ObjectId(customerId) },
      },
      {
        $unwind: "$insurance",
      },
      {
        $project: {
          _id: "$insurance._id",
          insuranceType: "Vehicle Insurance",
          insuranceCategory: "$insurance.insuranceCategory",
          insuranceSubType: "$insurance.insuranceType",
          vehicleId: "$_id",
          plateNumber: "$plateNumber",
          model: "$model",
          insuranceCompany: "$insurance.insuranceCompany",
          agent: "$insurance.agent",
          issueDate: "$insurance.insuranceStartDate",
          expirationDate: "$insurance.insuranceEndDate",
          insuranceStartDate: "$insurance.insuranceStartDate",
          insuranceEndDate: "$insurance.insuranceEndDate",
          paymentMethod: "$insurance.paymentMethod",
          premiumPaymentMethod: "$insurance.paymentMethod",
          insuranceAmount: "$insurance.insuranceAmount",
          premiumAmount: "$insurance.insuranceAmount",
          paidAmount: "$insurance.paidAmount",
          remainingDebt: "$insurance.remainingDebt",
          policyStatus: {
            $cond: {
              if: { $gte: ["$insurance.insuranceEndDate", new Date()] },
              then: "Active",
              else: "Expired",
            },
          },
          coverageDetails: "Vehicle insurance coverage",
          insuranceFiles: "$insurance.insuranceFiles",
          checkDetails: "$insurance.checkDetails",
          beneficiaries: [],
          notes: "",
          createdAt: "$insurance.createdAt",
          updatedAt: "$insurance.updatedAt",
          source: "Vehicle Collection",
        },
      },
    ]);

    // Get customer insurances (non-vehicle)
    const customerInsurances = customer.insurances || [];

    // Combine all insurances
    const allInsurances = [
      ...vehicleInsurances,
      ...standaloneVehicleInsurances,
      ...customerInsurances,
    ];

    // Group insurances by type
    const insurancesByType = {};
    allInsurances.forEach((insurance) => {
      const type = insurance.insuranceType || "Other";
      if (!insurancesByType[type]) {
        insurancesByType[type] = [];
      }
      insurancesByType[type].push(insurance);
    });

    // Calculate summary statistics
    const totalInsurances = allInsurances.length;
    const totalAmount = allInsurances.reduce(
      (sum, ins) => sum + (ins.insuranceAmount || 0),
      0
    );
    const totalPaid = allInsurances.reduce(
      (sum, ins) => sum + (ins.paidAmount || 0),
      0
    );
    const totalRemaining = allInsurances.reduce(
      (sum, ins) => sum + (ins.remainingDebt || 0),
      0
    );

    // Calculate premium amounts for customer insurances
    const totalPremium = customerInsurances.reduce(
      (sum, ins) => sum + (ins.premiumAmount || 0),
      0
    );

    // Get unique insurance types and companies
    const insuranceTypes = Object.keys(insurancesByType);
    const insuranceCompanies = [
      ...new Set(
        allInsurances.map((ins) => ins.insuranceCompany).filter(Boolean)
      ),
    ];

    // Calculate statistics by insurance type
    const insuranceTypeStats = {};
    Object.keys(insurancesByType).forEach((type) => {
      const insurances = insurancesByType[type];
      insuranceTypeStats[type] = {
        count: insurances.length,
        totalAmount: insurances.reduce(
          (sum, ins) => sum + (ins.insuranceAmount || 0),
          0
        ),
        totalPaid: insurances.reduce(
          (sum, ins) => sum + (ins.paidAmount || 0),
          0
        ),
        totalRemaining: insurances.reduce(
          (sum, ins) => sum + (ins.remainingDebt || 0),
          0
        ),
        totalPremium: insurances.reduce(
          (sum, ins) => sum + (ins.premiumAmount || 0),
          0
        ),
        activeCount: insurances.filter(
          (ins) => ins.policyStatus === "Active" || !ins.policyStatus
        ).length,
        expiredCount: insurances.filter((ins) => ins.policyStatus === "Expired")
          .length,
        suspendedCount: insurances.filter(
          (ins) => ins.policyStatus === "Suspended"
        ).length,
        cancelledCount: insurances.filter(
          (ins) => ins.policyStatus === "Cancelled"
        ).length,
      };
    });

    return res.status(200).json({
      message: "All customer insurances retrieved successfully",
      customer: {
        _id: customer._id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone_number: customer.phone_number,
        email: customer.email,
        city: customer.city,
      },
      summary: {
        totalInsurances,
        totalAmount,
        totalPaid,
        totalRemaining,
        totalPremium,
        insuranceTypes: insuranceTypes.length,
        insuranceCompanies: insuranceCompanies.length,
        activeInsurances: allInsurances.filter(
          (ins) => ins.policyStatus === "Active" || !ins.policyStatus
        ).length,
        expiredInsurances: allInsurances.filter(
          (ins) => ins.policyStatus === "Expired"
        ).length,
        suspendedInsurances: allInsurances.filter(
          (ins) => ins.policyStatus === "Suspended"
        ).length,
        cancelledInsurances: allInsurances.filter(
          (ins) => ins.policyStatus === "Cancelled"
        ).length,
      },
      insuranceTypes: insuranceTypes,
      insuranceCompanies: insuranceCompanies,
      insuranceTypeStats: insuranceTypeStats,
      insurancesByType: insurancesByType,
      allInsurances: allInsurances,
      sources: {
        customerInsurances: customerInsurances.length,
        customerVehicles: vehicleInsurances.length,
        vehicleCollection: standaloneVehicleInsurances.length,
      },
      // Available insurance types for reference
      availableInsuranceTypes: [
        "Health Insurance",
        "Life Insurance",
        "Property Insurance",
        "Travel Insurance",
        "Civil Liability Insurance",
        "Corporate Insurance",
        "Vehicle Insurance",
      ],
    });
  } catch (error) {
    console.error("Error retrieving all customer insurances:", error);
    next(error);
  }
};

// Get insurance details by ID (works for both customer and vehicle insurances)
export const getInsuranceById = async (req, res, next) => {
  try {
    const { insuranceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Invalid insurance ID format" });
    }

    // First, try to find in customer insurances
    const customerWithInsurance = await Customer.findOne({
      "insurances._id": insuranceId,
    });

    if (customerWithInsurance) {
      const insurance = customerWithInsurance.insurances.id(insuranceId);
      if (insurance) {
        return res.status(200).json({
          message: "Insurance found successfully",
          insurance: {
            ...insurance.toObject(),
            source: "Customer Insurance",
            customer: {
              _id: customerWithInsurance._id,
              first_name: customerWithInsurance.first_name,
              last_name: customerWithInsurance.last_name,
              phone_number: customerWithInsurance.phone_number,
              email: customerWithInsurance.email,
              city: customerWithInsurance.city,
            },
          },
        });
      }
    }

    // If not found in customer insurances, try vehicle insurances in customer vehicles
    const customerWithVehicleInsurance = await Customer.findOne({
      "vehicles.insurance._id": insuranceId,
    });

    if (customerWithVehicleInsurance) {
      for (const vehicle of customerWithVehicleInsurance.vehicles) {
        const insurance = vehicle.insurance.id(insuranceId);
        if (insurance) {
          return res.status(200).json({
            message: "Vehicle insurance found successfully",
            insurance: {
              ...insurance.toObject(),
              vehicleId: vehicle._id,
              plateNumber: vehicle.plateNumber,
              model: vehicle.model,
              source: "Customer Vehicle",
              customer: {
                _id: customerWithVehicleInsurance._id,
                first_name: customerWithVehicleInsurance.first_name,
                last_name: customerWithVehicleInsurance.last_name,
                phone_number: customerWithVehicleInsurance.phone_number,
                email: customerWithVehicleInsurance.email,
                city: customerWithVehicleInsurance.city,
              },
            },
          });
        }
      }
    }

    // If not found in customer vehicles, try standalone vehicle collection
    const vehicleWithInsurance = await Vehicle.findOne({
      "insurance._id": insuranceId,
    });

    if (vehicleWithInsurance) {
      const insurance = vehicleWithInsurance.insurance.id(insuranceId);
      if (insurance) {
        return res.status(200).json({
          message: "Vehicle insurance found successfully",
          insurance: {
            ...insurance.toObject(),
            vehicleId: vehicleWithInsurance._id,
            plateNumber: vehicleWithInsurance.plateNumber,
            model: vehicleWithInsurance.model,
            source: "Vehicle Collection",
            customer: {
              _id: vehicleWithInsurance.customerId,
              // Note: Customer details would need to be fetched separately if needed
            },
          },
        });
      }
    }

    // If not found anywhere
    return res.status(404).json({
      message: "Insurance not found",
      insuranceId: insuranceId,
    });
  } catch (error) {
    console.error("Error retrieving insurance by ID:", error);
    next(error);
  }
};

// Update insurance by ID (works for both customer and vehicle insurances)
export const updateInsuranceById = async (req, res, next) => {
  try {
    const { insuranceId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Invalid insurance ID format" });
    }

    // Handle file uploads
    let insuranceFilesUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Replace Cloudinary upload logic with local file storage
        insuranceFilesUrls.push(
          `/uploads/Customer/InsuranceFiles/${file.filename}`
        );
      }
    }

    // If files were uploaded, add them to update data
    if (insuranceFilesUrls.length > 0) {
      updateData.insuranceFiles = insuranceFilesUrls;
    }

    // First, try to find and update in customer insurances
    const customerWithInsurance = await Customer.findOne({
      "insurances._id": insuranceId,
    });

    if (customerWithInsurance) {
      const insurance = customerWithInsurance.insurances.id(insuranceId);
      if (insurance) {
        // Store old values for audit
        const oldValues = insurance.toObject();

        // Update the insurance
        Object.assign(insurance, updateData, { updatedAt: new Date() });

        // Validate insurance company if provided
        if (updateData.insuranceCompany) {
          let company;
          if (mongoose.Types.ObjectId.isValid(updateData.insuranceCompany)) {
            company = await InsuranceCompany.findById(
              updateData.insuranceCompany
            );
          } else {
            company = await InsuranceCompany.findOne({
              name: updateData.insuranceCompany,
            });
          }

          if (!company) {
            return res.status(404).json({
              message: `Insurance company ${updateData.insuranceCompany} not found`,
            });
          }
        }

        await customerWithInsurance.save();

        const findUser = await UserModel.findById(req.user._id);

        // Send notification
        const message = `${findUser.name} updated ${insurance.insuranceType} insurance for ${customerWithInsurance.first_name} ${customerWithInsurance.last_name}`;
        await sendNotificationLogic({
          senderId: req.user._id,
          message,
        });

        // Log audit
        await logAudit({
          userId: req.user._id,
          userName: findUser.name,
          action: `Update ${insurance.insuranceType} Insurance by ${findUser.name}`,
          entity: "Customer Insurance",
          entityId: insuranceId,
          oldValue: oldValues,
          newValue: insurance.toObject(),
        });

        return res.status(200).json({
          message: "Insurance updated successfully",
          insurance: {
            ...insurance.toObject(),
            source: "Customer Insurance",
            customer: {
              _id: customerWithInsurance._id,
              first_name: customerWithInsurance.first_name,
              last_name: customerWithInsurance.last_name,
            },
          },
        });
      }
    }

    // If not found in customer insurances, try vehicle insurances in customer vehicles
    const customerWithVehicleInsurance = await Customer.findOne({
      "vehicles.insurance._id": insuranceId,
    });

    if (customerWithVehicleInsurance) {
      for (const vehicle of customerWithVehicleInsurance.vehicles) {
        const insurance = vehicle.insurance.id(insuranceId);
        if (insurance) {
          // Store old values for audit
          const oldValues = insurance.toObject();

          // Update the insurance
          Object.assign(insurance, updateData, { updatedAt: new Date() });

          // Validate insurance company if provided
          if (updateData.insuranceCompany) {
            const company = await InsuranceCompany.findOne({
              name: updateData.insuranceCompany,
            });
            if (!company) {
              return res.status(404).json({
                message: `Insurance company ${updateData.insuranceCompany} not found`,
              });
            }
          }

          await customerWithVehicleInsurance.save();

          const findUser = await UserModel.findById(req.user._id);

          // Send notification
          const message = `${findUser.name} updated vehicle insurance for ${customerWithVehicleInsurance.first_name} ${customerWithVehicleInsurance.last_name}`;
          await sendNotificationLogic({
            senderId: req.user._id,
            message,
          });

          // Log audit
          await logAudit({
            userId: req.user._id,
            userName: findUser.name,
            action: `Update Vehicle Insurance by ${findUser.name}`,
            entity: "Vehicle Insurance",
            entityId: insuranceId,
            oldValue: oldValues,
            newValue: insurance.toObject(),
          });

          return res.status(200).json({
            message: "Vehicle insurance updated successfully",
            insurance: {
              ...insurance.toObject(),
              vehicleId: vehicle._id,
              plateNumber: vehicle.plateNumber,
              model: vehicle.model,
              source: "Customer Vehicle",
              customer: {
                _id: customerWithVehicleInsurance._id,
                first_name: customerWithVehicleInsurance.first_name,
                last_name: customerWithVehicleInsurance.last_name,
              },
            },
          });
        }
      }
    }

    // If not found in customer vehicles, try standalone vehicle collection
    const vehicleWithInsurance = await Vehicle.findOne({
      "insurance._id": insuranceId,
    });

    if (vehicleWithInsurance) {
      const insurance = vehicleWithInsurance.insurance.id(insuranceId);
      if (insurance) {
        // Store old values for audit
        const oldValues = insurance.toObject();

        // Update the insurance
        Object.assign(insurance, updateData, { updatedAt: new Date() });

        // Validate insurance company if provided
        if (updateData.insuranceCompany) {
          const company = await InsuranceCompany.findOne({
            name: updateData.insuranceCompany,
          });
          if (!company) {
            return res.status(404).json({
              message: `Insurance company ${updateData.insuranceCompany} not found`,
            });
          }
        }

        await vehicleWithInsurance.save();

        const findUser = await UserModel.findById(req.user._id);

        // Send notification
        const message = `${findUser.name} updated vehicle insurance`;
        await sendNotificationLogic({
          senderId: req.user._id,
          message,
        });

        // Log audit
        await logAudit({
          userId: req.user._id,
          userName: findUser.name,
          action: `Update Vehicle Insurance by ${findUser.name}`,
          entity: "Vehicle Insurance",
          entityId: insuranceId,
          oldValue: oldValues,
          newValue: insurance.toObject(),
        });

        return res.status(200).json({
          message: "Vehicle insurance updated successfully",
          insurance: {
            ...insurance.toObject(),
            vehicleId: vehicleWithInsurance._id,
            plateNumber: vehicleWithInsurance.plateNumber,
            model: vehicleWithInsurance.model,
            source: "Vehicle Collection",
          },
        });
      }
    }

    // If not found anywhere
    return res.status(404).json({
      message: "Insurance not found",
      insuranceId: insuranceId,
    });
  } catch (error) {
    console.error("Error updating insurance by ID:", error);
    next(error);
  }
};

// Delete insurance by ID (works for both customer and vehicle insurances)
export const deleteInsuranceById = async (req, res, next) => {
  try {
    const { insuranceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Invalid insurance ID format" });
    }

    // First, try to find and delete from customer insurances
    const customerWithInsurance = await Customer.findOne({
      "insurances._id": insuranceId,
    });

    if (customerWithInsurance) {
      const insurance = customerWithInsurance.insurances.id(insuranceId);
      if (insurance) {
        // Store insurance details for audit
        const deletedInsurance = insurance.toObject();

        // Remove the insurance
        customerWithInsurance.insurances.pull(insuranceId);
        await customerWithInsurance.save();

        const findUser = await UserModel.findById(req.user._id);

        // Send notification
        const message = `${findUser.name} deleted ${deletedInsurance.insuranceType} insurance for ${customerWithInsurance.first_name} ${customerWithInsurance.last_name}`;
        await sendNotificationLogic({
          senderId: req.user._id,
          message,
        });

        // Log audit
        await logAudit({
          userId: req.user._id,
          userName: findUser.name,
          action: `Delete ${deletedInsurance.insuranceType} Insurance by ${findUser.name}`,
          entity: "Customer Insurance",
          entityId: insuranceId,
          oldValue: deletedInsurance,
          newValue: null,
        });

        return res.status(200).json({
          message: "Insurance deleted successfully",
          deletedInsurance: {
            ...deletedInsurance,
            source: "Customer Insurance",
            customer: {
              _id: customerWithInsurance._id,
              first_name: customerWithInsurance.first_name,
              last_name: customerWithInsurance.last_name,
            },
          },
        });
      }
    }

    // If not found in customer insurances, try vehicle insurances in customer vehicles
    const customerWithVehicleInsurance = await Customer.findOne({
      "vehicles.insurance._id": insuranceId,
    });

    if (customerWithVehicleInsurance) {
      for (const vehicle of customerWithVehicleInsurance.vehicles) {
        const insurance = vehicle.insurance.id(insuranceId);
        if (insurance) {
          // Store insurance details for audit
          const deletedInsurance = insurance.toObject();

          // Remove the insurance
          vehicle.insurance.pull(insuranceId);
          await customerWithVehicleInsurance.save();

          const findUser = await UserModel.findById(req.user._id);

          // Send notification
          const message = `${findUser.name} deleted vehicle insurance for ${customerWithVehicleInsurance.first_name} ${customerWithVehicleInsurance.last_name}`;
          await sendNotificationLogic({
            senderId: req.user._id,
            message,
          });

          // Log audit
          await logAudit({
            userId: req.user._id,
            userName: findUser.name,
            action: `Delete Vehicle Insurance by ${findUser.name}`,
            entity: "Vehicle Insurance",
            entityId: insuranceId,
            oldValue: deletedInsurance,
            newValue: null,
          });

          return res.status(200).json({
            message: "Vehicle insurance deleted successfully",
            deletedInsurance: {
              ...deletedInsurance,
              vehicleId: vehicle._id,
              plateNumber: vehicle.plateNumber,
              model: vehicle.model,
              source: "Customer Vehicle",
              customer: {
                _id: customerWithVehicleInsurance._id,
                first_name: customerWithVehicleInsurance.first_name,
                last_name: customerWithVehicleInsurance.last_name,
              },
            },
          });
        }
      }
    }

    // If not found in customer vehicles, try standalone vehicle collection
    const vehicleWithInsurance = await Vehicle.findOne({
      "insurance._id": insuranceId,
    });

    if (vehicleWithInsurance) {
      const insurance = vehicleWithInsurance.insurance.id(insuranceId);
      if (insurance) {
        // Store insurance details for audit
        const deletedInsurance = insurance.toObject();

        // Remove the insurance
        vehicleWithInsurance.insurance.pull(insuranceId);
        await vehicleWithInsurance.save();

        const findUser = await UserModel.findById(req.user._id);

        // Send notification
        const message = `${findUser.name} deleted vehicle insurance`;
        await sendNotificationLogic({
          senderId: req.user._id,
          message,
        });

        // Log audit
        await logAudit({
          userId: req.user._id,
          userName: findUser.name,
          action: `Delete Vehicle Insurance by ${findUser.name}`,
          entity: "Vehicle Insurance",
          entityId: insuranceId,
          oldValue: deletedInsurance,
          newValue: null,
        });

        return res.status(200).json({
          message: "Vehicle insurance deleted successfully",
          deletedInsurance: {
            ...deletedInsurance,
            vehicleId: vehicleWithInsurance._id,
            plateNumber: vehicleWithInsurance.plateNumber,
            model: vehicleWithInsurance.model,
            source: "Vehicle Collection",
          },
        });
      }
    }

    // If not found anywhere
    return res.status(404).json({
      message: "Insurance not found",
      insuranceId: insuranceId,
    });
  } catch (error) {
    console.error("Error deleting insurance by ID:", error);
    next(error);
  }
};
