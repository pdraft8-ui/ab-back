import { HolyLandsReport } from "../../domain/entities/HolyLandsReport.entity.js";
export class CreateHolyLandsReportUseCase {
    constructor({ holyLandsReportRepository, customerRepository, auditService, notificationService, }) {
        this.holyLandsReportRepository = holyLandsReportRepository;
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
                insuranceDetails: {
                    policyNumber: accidentData.insuranceDetails?.policyNumber,
                    insuranceDuration: accidentData.insuranceDetails?.insuranceDuration,
                    fromDate: accidentData.insuranceDetails?.fromDate
                        ? new Date(accidentData.insuranceDetails.fromDate)
                        : null,
                    toDate: accidentData.insuranceDetails?.toDate
                        ? new Date(accidentData.insuranceDetails.toDate)
                        : null,
                    insuranceType: accidentData.insuranceDetails?.insuranceType,
                    vehicleNumber: plateNumber,
                },
                vehicleDetails: {
                    vehicleColor: vehicle.getColor(),
                    vehicleBranch: accidentData.vehicleDetails?.vehicleBranch,
                    chassisNumber: accidentData.vehicleDetails?.chassisNumber,
                    plateNumber: plateNumber,
                    modelYear: vehicle.getModelNumber(),
                    vehicleUsage: vehicle.getOwnership(),
                },
                ownerAndDriverDetails: {
                    ownerName: customer.getFullName(),
                    driverName: accidentData.ownerAndDriverDetails?.driverName || "",
                    driverID: accidentData.ownerAndDriverDetails?.driverID || "",
                    driverLicenseNumber: accidentData.ownerAndDriverDetails?.driverLicenseNumber || "",
                    driverLicenseGrade: accidentData.ownerAndDriverDetails?.driverLicenseGrade || "",
                    licenseIssueDate: accidentData.ownerAndDriverDetails?.licenseIssueDate
                        ? new Date(accidentData.ownerAndDriverDetails.licenseIssueDate)
                        : null,
                    licenseExpiryDate: vehicle.getLicenseExpiry(),
                    driverPhone: accidentData.ownerAndDriverDetails?.driverPhone || "",
                    driverAddress: accidentData.ownerAndDriverDetails?.driverAddress || "",
                    driverProfession: accidentData.ownerAndDriverDetails?.driverProfession || "",
                    licenseIssuePlace: accidentData.ownerAndDriverDetails?.licenseIssuePlace || "",
                },
                accidentDetails: accidentData.accidentDetails || {},
                otherVehicles: accidentData.otherVehicles || [],
                involvementDetails: accidentData.involvementDetails || {},
                injuries: accidentData.injuries || [],
                injuredNamesAndAddresses: accidentData.injuredNamesAndAddresses || "",
                passengerNamesAndAddresses: accidentData.passengerNamesAndAddresses || "",
                additionalDetails: accidentData.additionalDetails || "",
                signature: accidentData.signature || "",
                signatureDate: accidentData.signatureDate
                    ? new Date(accidentData.signatureDate)
                    : null,
                employeeNotes: accidentData.employeeNotes || "",
                employeeSignature: accidentData.employeeSignature || "",
                employeeDate: accidentData.employeeDate
                    ? new Date(accidentData.employeeDate)
                    : null,
            };
            // Create accident report entity
            const accidentReport = HolyLandsReport.create(accidentReportData);
            // Validate the entity
            if (!accidentReport.isValid()) {
                throw new Error("Invalid accident report data");
            }
            // Save to repository
            const savedAccidentReport = await this.holyLandsReportRepository.create(accidentReport);
            // Send notification
            await this.notificationService.sendNotification({
                type: "HOLY_LANDS_REPORT_CREATED",
                recipientId: customer.getId(),
                title: "New Holy Lands Accident Report Created",
                message: `Holy Lands accident report has been created for vehicle ${plateNumber}`,
                data: {
                    accidentReportId: savedAccidentReport.getId(),
                    plateNumber,
                },
            });
            // Log audit action
            await this.auditService.logAction({
                userId,
                userName,
                action: "CREATE_HOLY_LANDS_REPORT",
                entity: "HolyLandsReport",
                entityId: savedAccidentReport.getId(),
                oldValue: null,
                newValue: savedAccidentReport.toJSON(),
            });
            return savedAccidentReport;
        }
        catch (error) {
            throw new Error(`CreateHolyLandsReportUseCase error: ${error.message}`);
        }
    }
}
//# sourceMappingURL=CreateHolyLandsReportUseCase.js.map