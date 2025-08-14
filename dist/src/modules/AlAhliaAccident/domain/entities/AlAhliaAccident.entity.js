export class AlAhliaAccident {
    constructor({ id = null, customerId, reportNumber, accidentDate, accidentTime, policeNumber, agentNumber, policyInfo = {}, customerPerson = {}, driverInfo = {}, vehicleInfo = {}, accidentDetails = {}, thirdPartyVehicles = [], thirdPartyInjuries = [], thirdPartyPassengers = [], externalWitnesses = [], declaration = {}, createdAt = new Date(), updatedAt = new Date(), }) {
        this.id = id;
        this.customerId = customerId;
        this.reportNumber = reportNumber;
        this.accidentDate = accidentDate;
        this.accidentTime = accidentTime;
        this.policeNumber = policeNumber;
        this.agentNumber = agentNumber;
        this.policyInfo = policyInfo;
        this.customerPerson = customerPerson;
        this.driverInfo = driverInfo;
        this.vehicleInfo = vehicleInfo;
        this.accidentDetails = accidentDetails;
        this.thirdPartyVehicles = thirdPartyVehicles;
        this.thirdPartyInjuries = thirdPartyInjuries;
        this.thirdPartyPassengers = thirdPartyPassengers;
        this.externalWitnesses = externalWitnesses;
        this.declaration = declaration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return (this.isValidCustomerId() &&
            this.isValidAccidentDate() &&
            this.isValidAccidentTime() &&
            this.isValidPolicyInfo() &&
            this.isValidCustomerPerson() &&
            this.isValidDriverInfo() &&
            this.isValidVehicleInfo() &&
            this.isValidAccidentDetails() &&
            this.isValidThirdPartyVehicles() &&
            this.isValidThirdPartyInjuries() &&
            this.isValidThirdPartyPassengers() &&
            this.isValidExternalWitnesses() &&
            this.isValidDeclaration());
    }
    isValidCustomerId() {
        return this.customerId && typeof this.customerId === "string";
    }
    isValidAccidentDate() {
        return this.accidentDate && this.accidentDate instanceof Date;
    }
    isValidAccidentTime() {
        return this.accidentTime && typeof this.accidentTime === "string";
    }
    isValidPolicyInfo() {
        if (!this.policyInfo)
            return true;
        const { policyNumber, type, durationFrom, durationTo } = this.policyInfo;
        if (type && !["A.C.T", "TPL", "COM"].includes(type)) {
            return false;
        }
        if (durationFrom && !(durationFrom instanceof Date)) {
            return false;
        }
        if (durationTo && !(durationTo instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidCustomerPerson() {
        if (!this.customerPerson)
            return true;
        return typeof this.customerPerson.name === "string";
    }
    isValidDriverInfo() {
        if (!this.driverInfo)
            return true;
        const { name, idNumber, age, licenseNumber, licenseType, licenseIssueDate, matchesVehicle, } = this.driverInfo;
        if (age && (typeof age !== "number" || age < 0)) {
            return false;
        }
        if (licenseIssueDate && !(licenseIssueDate instanceof Date)) {
            return false;
        }
        if (matchesVehicle !== undefined && typeof matchesVehicle !== "boolean") {
            return false;
        }
        return true;
    }
    isValidVehicleInfo() {
        if (!this.vehicleInfo)
            return true;
        const { usage, manufactureYear, vehicleType, registrationNumber, registrationType, lastTestDate, licenseExpiry, } = this.vehicleInfo;
        if (lastTestDate && !(lastTestDate instanceof Date)) {
            return false;
        }
        if (licenseExpiry && !(licenseExpiry instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidAccidentDetails() {
        if (!this.accidentDetails)
            return true;
        const { location, time, weather, purposeOfUse, accidentType, sketch, driverStatement, signature, } = this.accidentDetails;
        if (accidentType &&
            !["physical", "material", "physicalAndMaterial"].includes(accidentType)) {
            return false;
        }
        return true;
    }
    isValidThirdPartyVehicles() {
        if (!Array.isArray(this.thirdPartyVehicles))
            return false;
        return this.thirdPartyVehicles.every((vehicle) => {
            return (typeof vehicle.vehicleNumber === "string" &&
                typeof vehicle.type === "string" &&
                typeof vehicle.model === "string" &&
                typeof vehicle.color === "string" &&
                typeof vehicle.ownerName === "string" &&
                typeof vehicle.ownerAddress === "string" &&
                typeof vehicle.ownerPhone === "string" &&
                typeof vehicle.driverName === "string" &&
                typeof vehicle.driverAddress === "string" &&
                typeof vehicle.driverPhone === "string" &&
                typeof vehicle.insuranceCompany === "string" &&
                typeof vehicle.insurancePolicyNumber === "string" &&
                typeof vehicle.damageDetails === "string");
        });
    }
    isValidThirdPartyInjuries() {
        if (!Array.isArray(this.thirdPartyInjuries))
            return false;
        return this.thirdPartyInjuries.every((injury) => {
            return (typeof injury.name === "string" &&
                typeof injury.age === "number" &&
                typeof injury.address === "string" &&
                typeof injury.profession === "string" &&
                typeof injury.injuryType === "string");
        });
    }
    isValidThirdPartyPassengers() {
        if (!Array.isArray(this.thirdPartyPassengers))
            return false;
        return this.thirdPartyPassengers.every((passenger) => {
            return typeof passenger.name === "string";
        });
    }
    isValidExternalWitnesses() {
        if (!Array.isArray(this.externalWitnesses))
            return false;
        return this.externalWitnesses.every((witness) => {
            return typeof witness.name === "string";
        });
    }
    isValidDeclaration() {
        if (!this.declaration)
            return true;
        const { driverSignature, declarationDate, officerSignature, officerDate } = this.declaration;
        if (declarationDate && !(declarationDate instanceof Date)) {
            return false;
        }
        if (officerDate && !(officerDate instanceof Date)) {
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
    getReportNumber() {
        return this.reportNumber;
    }
    getAccidentDate() {
        return this.accidentDate;
    }
    getAccidentTime() {
        return this.accidentTime;
    }
    getPoliceNumber() {
        return this.policeNumber;
    }
    getAgentNumber() {
        return this.agentNumber;
    }
    getPolicyInfo() {
        return this.policyInfo;
    }
    getCustomerPerson() {
        return this.customerPerson;
    }
    getDriverInfo() {
        return this.driverInfo;
    }
    getVehicleInfo() {
        return this.vehicleInfo;
    }
    getAccidentDetails() {
        return this.accidentDetails;
    }
    getThirdPartyVehicles() {
        return this.thirdPartyVehicles;
    }
    getThirdPartyInjuries() {
        return this.thirdPartyInjuries;
    }
    getThirdPartyPassengers() {
        return this.thirdPartyPassengers;
    }
    getExternalWitnesses() {
        return this.externalWitnesses;
    }
    getDeclaration() {
        return this.declaration;
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
    addThirdPartyVehicle(vehicle) {
        this.thirdPartyVehicles.push(vehicle);
        this.updatedAt = new Date();
    }
    addThirdPartyInjury(injury) {
        this.thirdPartyInjuries.push(injury);
        this.updatedAt = new Date();
    }
    addThirdPartyPassenger(passenger) {
        this.thirdPartyPassengers.push(passenger);
        this.updatedAt = new Date();
    }
    addExternalWitness(witness) {
        this.externalWitnesses.push(witness);
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            reportNumber: this.reportNumber,
            accidentDate: this.accidentDate,
            accidentTime: this.accidentTime,
            policeNumber: this.policeNumber,
            agentNumber: this.agentNumber,
            policyInfo: this.policyInfo,
            customerPerson: this.customerPerson,
            driverInfo: this.driverInfo,
            vehicleInfo: this.vehicleInfo,
            accidentDetails: this.accidentDetails,
            thirdPartyVehicles: this.thirdPartyVehicles,
            thirdPartyInjuries: this.thirdPartyInjuries,
            thirdPartyPassengers: this.thirdPartyPassengers,
            externalWitnesses: this.externalWitnesses,
            declaration: this.declaration,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(data) {
        return new AlAhliaAccident({
            ...data,
            accidentDate: data.accidentDate ? new Date(data.accidentDate) : null,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        });
    }
    static create(data) {
        return new AlAhliaAccident(data);
    }
}
//# sourceMappingURL=AlAhliaAccident.entity.js.map