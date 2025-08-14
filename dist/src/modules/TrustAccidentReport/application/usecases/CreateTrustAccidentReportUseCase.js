import { TrustAccidentReport } from "../../domain/entities/TrustAccidentReport.entity.js";
export class CreateTrustAccidentReportUseCase {
    constructor(trustAccidentReportRepository, customerRepository, auditService, notificationService) {
        this.trustAccidentReportRepository = trustAccidentReportRepository;
        this.customerRepository = customerRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(accidentReportData, plateNumber, user) {
        try {
            // Validate input data
            if (!accidentReportData || !plateNumber) {
                throw new Error("Accident report data and plate number are required");
            }
            // Find customer by plate number
            const customer = await this.customerRepository.findByPlateNumber(plateNumber);
            if (!customer) {
                throw new Error("Customer with this plate number not found");
            }
            // Find vehicle by plate number
            const vehicle = customer
                .getVehicles()
                .find((v) => v.plateNumber.toString() === plateNumber.toString());
            if (!vehicle) {
                throw new Error("Vehicle not found in the customer's vehicle list");
            }
            // Prepare accident report data with customer and vehicle info
            const reportData = {
                customerId: customer.getId(),
                accidentDetails: accidentReportData.accidentDetails,
                customerVehicle: {
                    ...accidentReportData.customerVehicle,
                    plateNumber: vehicle.plateNumber,
                    type: vehicle.type,
                    model: vehicle.model,
                    color: vehicle.color,
                    ownership: vehicle.ownership,
                },
                driverDetails: accidentReportData.driverDetails,
                damages: accidentReportData.damages,
                otherVehicle: accidentReportData.otherVehicle,
                witnesses: accidentReportData.witnesses,
                policeReport: accidentReportData.policeReport,
                narration: accidentReportData.narration,
                signature: accidentReportData.signature,
                declaration: accidentReportData.declaration,
            };
            // Create and validate the accident report entity
            const trustAccidentReport = TrustAccidentReport.create(reportData);
            if (!trustAccidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const savedReport = await this.trustAccidentReportRepository.create(trustAccidentReport);
            // Send notification
            const message = `${user.name} added new trust accident report`;
            await this.notificationService.sendNotification({
                senderId: user._id,
                message,
            });
            // Log audit action
            await this.auditService.logAction({
                userId: user._id,
                userName: user.name,
                action: `Add new Trust Accident Report by ${user.name}`,
                entity: "Trust Accident Report",
                entityId: savedReport.id,
                oldValue: null,
                newValue: savedReport.toJSON(),
            });
            return savedReport;
        }
        catch (error) {
            throw new Error(`CreateTrustAccidentReportUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=CreateTrustAccidentReportUseCase.js.map