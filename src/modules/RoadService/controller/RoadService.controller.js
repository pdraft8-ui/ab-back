import { RoadServiceModel } from "../../../../DB/models/RoadService.model.js";

export const addRoad = async (req, res, next) => {
  const { companyName, amount, amountUnder2007 } = req.body;
  try {
    const newService = new RoadServiceModel({
      companyName,
      amount,
      amountUnder2007,
    });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service added successfully!", service: newService });
  } catch (error) {
    //   res.status(500).json({ message: "An error occurred while adding the service", error });
    next(error);
  }
};
export const updateRoad = async (req, res, next) => {
  const { id } = req.params;
  const { amount, amountUnder2007 } = req.body;
  try {
    const findRoad = await RoadServiceModel.findById(id);
    if (!findRoad) {
      return res.status(404).json({ message: "Service not found" });
    } else {
      const updatedService = await RoadServiceModel.findByIdAndUpdate(
        id,
        { amount, amountUnder2007 },
        { new: true }
      );
      res.json({
        message: "Service updated successfully!",
        service: updatedService,
      });
    }
  } catch (error) {
    //  res.status(500).json({ message: "An error occurred while updating", error });
    next(error);
  }
};

export const deleteRoad = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findRoad = await RoadServiceModel.findById(id);
    if (!findRoad) {
      return res.status(404).json({ message: "Service not found" });
    } else {
      const deleteService = await RoadServiceModel.findByIdAndDelete(id);
      res.json({ message: "Service deleted successfully", deleteService });
    }
  } catch (error) {
    // res.status(500).json({ message: "An error occurred while deleting", error });
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const find = await RoadServiceModel.find();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: find || [],
    });
  } catch (error) {
    next(error);
  }
};
