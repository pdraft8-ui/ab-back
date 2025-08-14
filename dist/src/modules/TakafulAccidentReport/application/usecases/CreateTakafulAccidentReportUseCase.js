import { TakafulAccidentReport } from "../../domain/entities/TakafulAccidentReport.entity.js";
export class CreateTakafulAccidentReportUseCase {
    constructor(takafulAccidentReportRepository, customerRepository, auditService, notificationService) {
        this.takafulAccidentReportRepository = takafulAccidentReportRepository;
        this.customerRepository = customerRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(accidentReportData, plateNumber, userId, userName) {
        try {
            // Validate input data
            if (!accidentReportData) {
                throw new Error("Accident report data is required");
            }
            if (!plateNumber) {
                throw new Error("Plate number is required");
            }
            // Find customer by plate number
            const customer = await this.customerRepository.findByPlateNumber(plateNumber);
            if (!customer) {
                throw new Error("Customer person or vehicle not found");
            }
            // Find vehicle in customer's vehicles
            const vehicle = customer.vehicles.find((v) => v.plateNumber.toString() === plateNumber.toString());
            if (!vehicle) {
                throw new Error("Vehicle not found under the customer person's vehicles");
            }
            // Create accident report entity
            const accidentReport = new TakafulAccidentReport({
                ...accidentReportData,
                customerId: customer.id,
            });
            if (!accidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const createdAccidentReport = await this.takafulAccidentReportRepository.create(accidentReport.toJSON());
            // Send notification
            await this.notificationService.sendNotification({
                senderId: userId,
                message: `${userName} added new takaful accident report`,
                recipients: [customer.id],
            });
            // Log audit action
            await this.auditService.logAction("CREATE_TAKAFUL_ACCIDENT_REPORT", `Created takaful accident report for customer: ${customer.name}`, userId, userName, null, createdAccidentReport);
            return createdAccidentReport;
        }
        catch (error) {
            console.error("CreateTakafulAccidentReportUseCase error:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=CreateTakafulAccidentReportUseCase.js.map