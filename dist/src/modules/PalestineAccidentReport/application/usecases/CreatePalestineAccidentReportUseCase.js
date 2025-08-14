import { PalestineAccidentReport } from "../../domain/entities/PalestineAccidentReport.entity.js";
export class CreatePalestineAccidentReportUseCase {
    constructor({ palestineAccidentReportRepository, customerRepository, auditService, notificationService, }) {
        this.palestineAccidentReportRepository = palestineAccidentReportRepository;
        this.customerRepository = customerRepository;
        this.auditService = auditService;
        this.notificationService = notificationService;
    }
    async execute(accidentData, plateNumber, userId, userName) {
        try {
            // Validate input data
            if (!accidentData || !plateNumber) {
                throw new Error("Accident data and plate number are required");
            }
            // Find customer by plate number
            const customer = await this.customerRepository.findByPlateNumber(plateNumber);
            if (!customer) {
                throw new Error("Customer not found for the given plate number");
            }
            // Find vehicle by plate number
            const vehicle = customer
                .getVehicles()
                .find((v) => v.getPlateNumber().toString() === plateNumber.toString());
            if (!vehicle) {
                throw new Error("Vehicle not found in the customer's vehicle list");
            }
            // Prepare accident data with customer and vehicle info
            const accidentReportData = {
                customerId: customer.getId(),
                agentInfo: accidentData.agentInfo || {},
                vehicleInfo: {
                    documentDate: accidentData.vehicleInfo?.documentDate
                        ? new Date(accidentData.vehicleInfo.documentDate)
                        : null,
                    vehicleNumber: plateNumber,
                    vehicleType: vehicle.getType(),
                    make: accidentData.vehicleInfo?.make,
                    modelYear: vehicle.getModel(),
                    usage: accidentData.vehicleInfo?.usage,
                    color: accidentData.vehicleInfo?.color,
                    ownerName: customer.getFullName(),
                    ownerID: customer.getId(),
                    registrationExpiry: accidentData.vehicleInfo?.registrationExpiry
                        ? new Date(accidentData.vehicleInfo.registrationExpiry)
                        : null,
                },
                driverInfo: accidentData.driverInfo || {},
                accidentDetails: accidentData.accidentDetails || {},
                thirdParty: accidentData.thirdParty || {},
                injuries: accidentData.injuries || [],
                witnesses: accidentData.witnesses || [],
                passengers: accidentData.passengers || [],
                additionalDetails: accidentData.additionalDetails || {},
            };
            // Create accident report entity
            const accidentReport = PalestineAccidentReport.create(accidentReportData);
            // Validate the entity
            if (!accidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const savedAccidentReport = await this.palestineAccidentReportRepository.create(accidentReport);
            // Send notification
            await this.notificationService.sendNotification({
                type: "PALESTINE_ACCIDENT_REPORT_CREATED",
                recipientId: customer.getId(),
                title: "New Palestine Accident Report Created",
                message: `Palestine accident report has been created for vehicle ${plateNumber}`,
                data: {
                    accidentReportId: savedAccidentReport.getId(),
                    plateNumber,
                },
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE_PALESTINE_ACCIDENT_REPORT",
                entity: "PalestineAccidentReport",
                entityId: savedAccidentReport.getId(),
                oldValue: null,
                newValue: savedAccidentReport.toJSON(),
            });
            return savedAccidentReport;
        }
        catch (error) {
            throw new Error(`CreatePalestineAccidentReportUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=CreatePalestineAccidentReportUseCase.js.map