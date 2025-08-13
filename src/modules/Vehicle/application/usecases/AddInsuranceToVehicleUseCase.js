export class AddInsuranceToVehicleUseCase {
  constructor(vehicleRepository, auditService) {
    this.vehicleRepository = vehicleRepository;
    this.auditService = auditService;
  }

  async execute(vehicleId, insuranceData, userId, userName) {
    try {
      if (!vehicleId) {
        throw new Error("Vehicle ID is required.");
      }

      if (!insuranceData) {
        throw new Error("Insurance data is required.");
      }

      // Validate required insurance fields
      const requiredFields = [
        "insuranceStartDate",
        "insuranceEndDate",
        "isUnder24",
        "insuranceCategory",
        "insuranceType",
        "insuranceCompany",
        "paymentMethod",
        "insuranceAmount",
        "paidAmount",
      ];

      for (const field of requiredFields) {
        if (
          insuranceData[field] === undefined ||
          insuranceData[field] === null ||
          insuranceData[field] === ""
        ) {
          throw new Error(`Insurance ${field} is required.`);
        }
      }

      // Validate dates
      const startDate = new Date(insuranceData.insuranceStartDate);
      const endDate = new Date(insuranceData.insuranceEndDate);

      if (startDate >= endDate) {
        throw new Error("Insurance start date must be before end date.");
      }

      if (startDate < new Date()) {
        throw new Error("Insurance start date cannot be in the past.");
      }

      // Validate amounts
      if (insuranceData.insuranceAmount <= 0) {
        throw new Error("Insurance amount must be greater than 0.");
      }

      if (insuranceData.paidAmount < 0) {
        throw new Error("Paid amount cannot be negative.");
      }

      if (insuranceData.paidAmount > insuranceData.insuranceAmount) {
        throw new Error("Paid amount cannot exceed insurance amount.");
      }

      // Check if vehicle exists
      const vehicle = await this.vehicleRepository.findById(vehicleId);
      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }

      // Add insurance to vehicle
      const updatedVehicle = await this.vehicleRepository.addInsuranceToVehicle(
        vehicleId,
        insuranceData
      );

      // Log audit
      if (this.auditService) {
        await this.auditService.logAction({
          userId,
          userName,
          action: "ADD_INSURANCE_TO_VEHICLE",
          entity: "Vehicle",
          entityId: vehicleId,
          newValue: { insurance: insuranceData },
        });
      }

      return updatedVehicle;
    } catch (error) {
      console.error("AddInsuranceToVehicleUseCase error:", error);
      throw error;
    }
  }
}
