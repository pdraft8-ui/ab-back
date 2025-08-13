import mongoose from "mongoose";
const RoadServiceSchema=new mongoose.Schema({
    companyName: { type: String, required: true },
    serviceType: { type: String, default: "خدمات طريق" },
    amount: { type: Number, required: true },
    amountUnder2007: { type: Number, required: true }
})
const RoadServiceModel=mongoose.model('road',RoadServiceSchema)
export {RoadServiceModel}