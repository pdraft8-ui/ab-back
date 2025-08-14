export class HolyLandsReport {
    constructor({ id = null, customerId, insuranceDetails = {}, vehicleDetails = {}, ownerAndDriverDetails = {}, accidentDetails = {}, otherVehicles = [], involvementDetails = {}, injuries = [], injuredNamesAndAddresses = "", passengerNamesAndAddresses = "", additionalDetails = "", signature = "", signatureDate = null, employeeNotes = "", employeeSignature = "", employeeDate = null, createdAt = new Date(), updatedAt = new Date(), }) {
        this.id = id;
        this.customerId = customerId;
        this.insuranceDetails = insuranceDetails;
        this.vehicleDetails = vehicleDetails;
        this.ownerAndDriverDetails = ownerAndDriverDetails;
        this.accidentDetails = accidentDetails;
        this.otherVehicles = otherVehicles;
        this.involvementDetails = involvementDetails;
        this.injuries = injuries;
        this.injuredNamesAndAddresses = injuredNamesAndAddresses;
        this.passengerNamesAndAddresses = passengerNamesAndAddresses;
        this.additionalDetails = additionalDetails;
        this.signature = signature;
        this.signatureDate = signatureDate;
        this.employeeNotes = employeeNotes;
        this.employeeSignature = employeeSignature;
        this.employeeDate = employeeDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return (this.isValidCustomerId() &&
            this.isValidInsuranceDetails() &&
            this.isValidVehicleDetails() &&
            this.isValidOwnerAndDriverDetails() &&
            this.isValidAccidentDetails() &&
            this.isValidOtherVehicles() &&
            this.isValidInvolvementDetails() &&
            this.isValidInjuries() &&
            this.isValidDates());
    }
    isValidCustomerId() {
        return this.customerId && typeof this.customerId === "string";
    }
    isValidInsuranceDetails() {
        if (!this.insuranceDetails)
            return true;
        const { fromDate, toDate } = this.insuranceDetails;
        if (fromDate && !(fromDate instanceof Date)) {
            return false;
        }
        if (toDate && !(toDate instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidVehicleDetails() {
        if (!this.vehicleDetails)
            return true;
        const { modelYear } = this.vehicleDetails;
        if (modelYear && typeof modelYear !== "number") {
            return false;
        }
        return true;
    }
    isValidOwnerAndDriverDetails() {
        if (!this.ownerAndDriverDetails)
            return true;
        const { licenseIssueDate, licenseExpiryDate } = this.ownerAndDriverDetails;
        if (licenseIssueDate && !(licenseIssueDate instanceof Date)) {
            return false;
        }
        if (licenseExpiryDate && !(licenseExpiryDate instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidAccidentDetails() {
        if (!this.accidentDetails)
            return true;
        const { accidentDate, numberOfPassengers, policeNotified } = this.accidentDetails;
        if (accidentDate && !(accidentDate instanceof Date)) {
            return false;
        }
        if (numberOfPassengers && typeof numberOfPassengers !== "number") {
            return false;
        }
        if (policeNotified !== undefined && typeof policeNotified !== "boolean") {
            return false;
        }
        return true;
    }
    isValidOtherVehicles() {
        if (!Array.isArray(this.otherVehicles))
            return false;
        return this.otherVehicles.every((vehicle) => {
            return (typeof vehicle.vehicleNumber === "string" &&
                typeof vehicle.vehicleType === "string" &&
                typeof vehicle.make === "string" &&
                typeof vehicle.model === "string" &&
                typeof vehicle.plateNumber === "string" &&
                typeof vehicle.insuranceCompany === "string" &&
                typeof vehicle.driverName === "string" &&
                typeof vehicle.driverAddress === "string" &&
                typeof vehicle.details === "string");
        });
    }
    isValidInvolvementDetails() {
        if (!this.involvementDetails)
            return true;
        return true; // No specific validation needed for involvement details
    }
    isValidInjuries() {
        if (!Array.isArray(this.injuries))
            return false;
        return this.injuries.every((injury) => {
            const { name, age, address, occupation, maritalStatus, injuryType } = injury;
            if (age && typeof age !== "number") {
                return false;
            }
            return (typeof name === "string" &&
                typeof address === "string" &&
                typeof occupation === "string" &&
                typeof maritalStatus === "string" &&
                typeof injuryType === "string");
        });
    }
    isValidDates() {
        if (this.signatureDate && !(this.signatureDate instanceof Date)) {
            return false;
        }
        if (this.employeeDate && !(this.employeeDate instanceof Date)) {
            return false;
        }
        return true;
    }
    // Getters
    getId() {
        return this.id;
    }
    getCustomerId() {
        return this.customerId;
    }
    getInsuranceDetails() {
        return this.insuranceDetails;
    }
    getVehicleDetails() {
        return this.vehicleDetails;
    }
    getOwnerAndDriverDetails() {
        return this.ownerAndDriverDetails;
    }
    getAccidentDetails() {
        return this.accidentDetails;
    }
    getOtherVehicles() {
        return this.otherVehicles;
    }
    getInvolvementDetails() {
        return this.involvementDetails;
    }
    getInjuries() {
        return this.injuries;
    }
    getInjuredNamesAndAddresses() {
        return this.injuredNamesAndAddresses;
    }
    getPassengerNamesAndAddresses() {
        return this.passengerNamesAndAddresses;
    }
    getAdditionalDetails() {
        return this.additionalDetails;
    }
    getSignature() {
        return this.signature;
    }
    getSignatureDate() {
        return this.signatureDate;
    }
    getEmployeeNotes() {
        return this.employeeNotes;
    }
    getEmployeeSignature() {
        return this.employeeSignature;
    }
    getEmployeeDate() {
        return this.employeeDate;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    // Business logic methods
    updateAccidentReport(updateData) {
        Object.assign(this, updateData);
        this.updatedAt = new Date();
    }
    addOtherVehicle(vehicle) {
        this.otherVehicles.push(vehicle);
        this.updatedAt = new Date();
    }
    addInjury(injury) {
        this.injuries.push(injury);
        this.updatedAt = new Date();
    }
    setSignature(signature, date) {
        this.signature = signature;
        this.signatureDate = date || new Date();
        this.updatedAt = new Date();
    }
    setEmployeeSignature(signature, date) {
        this.employeeSignature = signature;
        this.employeeDate = date || new Date();
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            insuranceDetails: this.insuranceDetails,
            vehicleDetails: this.vehicleDetails,
            ownerAndDriverDetails: this.ownerAndDriverDetails,
            accidentDetails: this.accidentDetails,
            otherVehicles: this.otherVehicles,
            involvementDetails: this.involvementDetails,
            injuries: this.injuries,
            injuredNamesAndAddresses: this.injuredNamesAndAddresses,
            passengerNamesAndAddresses: this.passengerNamesAndAddresses,
            additionalDetails: this.additionalDetails,
            signature: this.signature,
            signatureDate: this.signatureDate,
            employeeNotes: this.employeeNotes,
            employeeSignature: this.employeeSignature,
            employeeDate: this.employeeDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(data) {
        return new HolyLandsReport({
            ...data,
            insuranceDetails: {
                ...data.insuranceDetails,
                fromDate: data.insuranceDetails?.fromDate
                    ? new Date(data.insuranceDetails.fromDate)
                    : null,
                toDate: data.insuranceDetails?.toDate
                    ? new Date(data.insuranceDetails.toDate)
                    : null,
            },
            ownerAndDriverDetails: {
                ...data.ownerAndDriverDetails,
                licenseIssueDate: data.ownerAndDriverDetails?.licenseIssueDate
                    ? new Date(data.ownerAndDriverDetails.licenseIssueDate)
                    : null,
                licenseExpiryDate: data.ownerAndDriverDetails?.licenseExpiryDate
                    ? new Date(data.ownerAndDriverDetails.licenseExpiryDate)
                    : null,
            },
            accidentDetails: {
                ...data.accidentDetails,
                accidentDate: data.accidentDetails?.accidentDate
                    ? new Date(data.accidentDetails.accidentDate)
                    : null,
            },
            signatureDate: data.signatureDate ? new Date(data.signatureDate) : null,
            employeeDate: data.employeeDate ? new Date(data.employeeDate) : null,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        });
    }
    static create(data) {
        return new HolyLandsReport(data);
    }
}
//# sourceMappingURL=HolyLandsReport.entity.js.map