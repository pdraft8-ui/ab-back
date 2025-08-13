import Cheque from "../../../../DB/models/Cheque.model.js";
import { catchAsyncError } from "../../../utils/catchAsyncError.js";

export const createCheque = catchAsyncError(async (req, res) => {
  const cheque = await Cheque.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json({ message: "Success", cheque });
});

export const getAllCheques = catchAsyncError(async (req, res) => {
  const cheques = await Cheque.find().populate("customer createdBy");
  res.status(200).json({ message: "Success", cheques });
});

export const getChequeById = catchAsyncError(async (req, res) => {
  const cheque = await Cheque.findById(req.params.id).populate(
    "customer createdBy"
  );
  if (!cheque) {
    return res.status(404).json({ message: "Cheque not found" });
  }
  res.status(200).json({ message: "Success", cheque });
});

export const updateCheque = catchAsyncError(async (req, res) => {
  const cheque = await Cheque.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedBy: req.user._id },
    { new: true }
  ).populate("customer createdBy updatedBy");

  if (!cheque) {
    return res.status(404).json({ message: "Cheque not found" });
  }
  res.status(200).json({ message: "Success", cheque });
});

export const deleteCheque = catchAsyncError(async (req, res) => {
  const cheque = await Cheque.findByIdAndDelete(req.params.id);
  if (!cheque) {
    return res.status(404).json({ message: "Cheque not found" });
  }
  res.status(200).json({ message: "Success" });
});

export const getCustomerCheques = catchAsyncError(async (req, res) => {
  const cheques = await Cheque.find({
    customer: req.params.customerId,
  }).populate("createdBy updatedBy");
  res.status(200).json({ message: "Success", cheques });
});
