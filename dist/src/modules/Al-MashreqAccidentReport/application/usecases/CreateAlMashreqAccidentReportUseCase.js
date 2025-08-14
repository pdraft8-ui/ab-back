import { AlMashreqAccidentReport } from "../../domain/entities/AlMashreqAccidentReport.entity.js";
export class CreateAlMashreqAccidentReportUseCase {
    constructor({ alMashreqAccidentReportRepository, customerRepository, auditService, notificationService, }) {
        this.alMashreqAccidentReportRepository = alMashreqAccidentReportRepository;
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
                branchOffice: accidentData.branchOffice || "",
                insurancePolicy: accidentData.insurancePolicy || {},
                customerPerson: {
                    name: customer.getFullName(),
                    personalNumber: customer.getId(),
                    fullAddress: customer.getCity(),
                    phone: customer.getPhoneNumber(),
                },
                vehicle: {
                    registrationNumber: plateNumber,
                    usage: accidentData.vehicle?.usage,
                    type: vehicle.getType(),
                    makeYear: accidentData.vehicle?.makeYear,
                    color: vehicle.getColor(),
                },
                driver: accidentData.driver || {},
                accident: accidentData.accident || {},
                otherVehicles: accidentData.otherVehicles || [],
                vehicleDamages: accidentData.vehicleDamages || "",
                personalInjuries: accidentData.personalInjuries || [],
                thirdPartyInjuredNames: accidentData.thirdPartyInjuredNames || [],
                vehiclePassengers: accidentData.vehiclePassengers || [],
                externalWitnesses: accidentData.externalWitnesses || [],
                driverSignature: accidentData.driverSignature || {},
                claimant: accidentData.claimant || {},
                receiver: accidentData.receiver || {},
                generalNotes: accidentData.generalNotes || "",
            };
            // Create accident report entity
            const accidentReport = AlMashreqAccidentReport.create(accidentReportData);
            // Validate the entity
            if (!accidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const savedAccidentReport = await this.alMashreqAccidentReportRepository.create(accidentReport);
            // Send notification
            await this.notificationService.sendNotification({
                type: "AL_MASHREQ_ACCIDENT_REPORT_CREATED",
                recipientId: customer.getId(),
                title: "New Al-Mashreq Accident Report Created",
                message: `Al-Mashreq accident report has been created for vehicle ${plateNumber}`,
                data: {
                    accidentReportId: savedAccidentReport.getId(),
                    plateNumber,
                },
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE_AL_MASHREQ_ACCIDENT_REPORT",
                entity: "AlMashreqAccidentReport",
                entityId: savedAccidentReport.getId(),
                oldValue: null,
                newValue: savedAccidentReport.toJSON(),
            });
            return savedAccidentReport;
        }
        catch (error) {
            throw new Error(`CreateAlMashreqAccidentReportUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=CreateAlMashreqAccidentReportUseCase.js.map