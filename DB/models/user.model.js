import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      match: [/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      default: "islam@112233",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee", "customer", "headOfDepartment", "agents"],
    },
    sendCode: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: true,
      enum: ["inactive", "active"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
