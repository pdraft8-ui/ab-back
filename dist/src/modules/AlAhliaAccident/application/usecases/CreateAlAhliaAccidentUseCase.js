import { AlAhliaAccident } from "../../domain/entities/AlAhliaAccident.entity.js";
export class CreateAlAhliaAccidentUseCase {
    constructor({ alAhliaAccidentRepository, customerRepository, auditService, notificationService, }) {
        this.alAhliaAccidentRepository = alAhliaAccidentRepository;
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
                reportNumber: accidentData.reportNumber,
                accidentDate: new Date(accidentData.accidentDate),
                accidentTime: accidentData.accidentTime,
                policeNumber: accidentData.policeNumber,
                agentNumber: accidentData.agentNumber,
                policyInfo: accidentData.policyInfo || {},
                customerPerson: {
                    name: customer.getFullName() || accidentData.customerPerson?.name,
                },
                driverInfo: accidentData.driverInfo || {},
                vehicleInfo: {
                    usage: accidentData.vehicleInfo?.usage,
                    manufactureYear: accidentData.vehicleInfo?.manufactureYear,
                    vehicleType: vehicle.getType() || accidentData.vehicleInfo?.vehicleType,
                    registrationNumber: plateNumber,
                    registrationType: accidentData.vehicleInfo?.registrationType,
                    lastTestDate: vehicle.getLastTest(),
                    licenseExpiry: vehicle.getLicenseExpiry() ||
                        accidentData.vehicleInfo?.licenseExpiry,
                },
                accidentDetails: accidentData.accidentDetails || {},
                thirdPartyVehicles: accidentData.thirdPartyVehicles || [],
                thirdPartyInjuries: accidentData.thirdPartyInjuries || [],
                thirdPartyPassengers: accidentData.thirdPartyPassengers || [],
                externalWitnesses: accidentData.externalWitnesses || [],
                declaration: accidentData.declaration || {},
            };
            // Create accident report entity
            const accidentReport = AlAhliaAccident.create(accidentReportData);
            // Validate the entity
            if (!accidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const savedAccidentReport = await this.alAhliaAccidentRepository.create(accidentReport);
            // Send notification
            await this.notificationService.sendNotification({
                type: "ACCIDENT_REPORT_CREATED",
                recipientId: customer.getId(),
                title: "New Accident Report Created",
                message: `Accident report ${savedAccidentReport.getReportNumber()} has been created for vehicle ${plateNumber}`,
                data: {
                    accidentReportId: savedAccidentReport.getId(),
                    plateNumber,
                    reportNumber: savedAccidentReport.getReportNumber(),
                },
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE_AL_AHLIA_ACCIDENT_REPORT",
                entity: "AlAhliaAccident",
                entityId: savedAccidentReport.getId(),
                oldValue: null,
                newValue: savedAccidentReport.toJSON(),
            });
            return savedAccidentReport;
        }
        catch (error) {
            throw new Error(`CreateAlAhliaAccidentUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=CreateAlAhliaAccidentUseCase.js.map