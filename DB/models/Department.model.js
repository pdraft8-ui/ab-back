import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    role: { type: String, default: "headOfDepartment" },
    employees: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: false },
        role: { type: String, default: "employee" },
        status: { type: String, default: "active" },
      },
    ],

    permissions: [
      {
        type: String,
        enum: [
          "addAccedent",
          "showAccedent",
          "deleteAccedent",
          "createNotification",
          "getNotifications",
          "markAsRead",
          "Deletenotification",
          "addCustomer",
          "deleteCustomer",
          "allCustomer",
          "findbyidCustomer",
          "addcar",
          "removeCar",
          "showVehicles",
          "addRoad",
          "deleteRoad",
          "updateRoad",
          "allRoad",
          "addAgents",
          "deleteAgents",
          "updateAgents",
          "allAgents",
          "addCompany",
          "deleteCompany",
          "upateCompany",
          "allCompany",
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// لحساب عدد الموظفين تلقائياً
departmentSchema.virtual("employeeCount").get(function () {
  return this.employees?.length || 0;
});

export default model("Department", departmentSchema);
