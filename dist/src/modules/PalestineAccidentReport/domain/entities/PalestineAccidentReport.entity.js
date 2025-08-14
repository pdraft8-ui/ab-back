export class PalestineAccidentReport {
    constructor({ id = null, customerId, agentInfo = {}, vehicleInfo = {}, driverInfo = {}, accidentDetails = {}, thirdParty = {}, injuries = [], witnesses = [], passengers = [], additionalDetails = {}, createdAt = new Date(), updatedAt = new Date(), }) {
        this.id = id;
        this.customerId = customerId;
        this.agentInfo = agentInfo;
        this.vehicleInfo = vehicleInfo;
        this.driverInfo = driverInfo;
        this.accidentDetails = accidentDetails;
        this.thirdParty = thirdParty;
        this.injuries = injuries;
        this.witnesses = witnesses;
        this.passengers = passengers;
        this.additionalDetails = additionalDetails;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return (this.isValidCustomerId() &&
            this.isValidAgentInfo() &&
            this.isValidVehicleInfo() &&
            this.isValidDriverInfo() &&
            this.isValidAccidentDetails() &&
            this.isValidThirdParty() &&
            this.isValidInjuries() &&
            this.isValidWitnesses() &&
            this.isValidPassengers() &&
            this.isValidAdditionalDetails());
    }
    isValidCustomerId() {
        return this.customerId && typeof this.customerId === "string";
    }
    isValidAgentInfo() {
        if (!this.agentInfo)
            return true;
        const { agentName, documentNumber, documentType, insurancePeriod } = this.agentInfo;
        if (documentType &&
            !["comprehensive", "thirdParty"].includes(documentType)) {
            return false;
        }
        if (insurancePeriod) {
            const { from, to } = insurancePeriod;
            if (from && !(from instanceof Date)) {
                return false;
            }
            if (to && !(to instanceof Date)) {
                return false;
            }
        }
        return true;
    }
    isValidVehicleInfo() {
        if (!this.vehicleInfo)
            return true;
        const { documentDate, vehicleNumber, vehicleType, make, modelYear, usage, color, ownerName, ownerID, registrationExpiry, } = this.vehicleInfo;
        if (documentDate && !(documentDate instanceof Date)) {
            return false;
        }
        if (registrationExpiry && !(registrationExpiry instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidDriverInfo() {
        if (!this.driverInfo)
            return true;
        const { name, idNumber, age, occupation, license, address } = this.driverInfo;
        if (age && (typeof age !== "number" || age < 0)) {
            return false;
        }
        if (license) {
            const { number, type, issueDate, expiryDate } = license;
            if (issueDate && !(issueDate instanceof Date)) {
                return false;
            }
            if (expiryDate && !(expiryDate instanceof Date)) {
                return false;
            }
        }
        return true;
    }
    isValidAccidentDetails() {
        if (!this.accidentDetails)
            return true;
        const { accidentDate, time, location, numberOfPassengers, vehicleSpeed, vehiclePurposeAtTime, accidentDescription, responsibleParty, policeInformed, policeStation, } = this.accidentDetails;
        if (accidentDate && !(accidentDate instanceof Date)) {
            return false;
        }
        if (numberOfPassengers &&
            (typeof numberOfPassengers !== "number" || numberOfPassengers < 0)) {
            return false;
        }
        if (vehicleSpeed &&
            (typeof vehicleSpeed !== "number" || vehicleSpeed < 0)) {
            return false;
        }
        if (policeInformed !== undefined && typeof policeInformed !== "boolean") {
            return false;
        }
        return true;
    }
    isValidThirdParty() {
        if (!this.thirdParty)
            return true;
        const { vehicleNumber, vehicleType, make, model, color, ownerName, ownerPhone, ownerAddress, driverName, driverPhone, driverAddress, insuranceCompany, insurancePolicyNumber, vehicleDamages, } = this.thirdParty;
        return true; // All fields are optional strings
    }
    isValidInjuries() {
        if (!Array.isArray(this.injuries))
            return false;
        return this.injuries.every((injury) => {
            const { name, age, occupation, address, injuryType } = injury;
            if (age && (typeof age !== "number" || age < 0)) {
                return false;
            }
            return true;
        });
    }
    isValidWitnesses() {
        if (!Array.isArray(this.witnesses))
            return false;
        return this.witnesses.every((witness) => {
            const { name, address, statementGiven } = witness;
            if (statementGiven !== undefined && typeof statementGiven !== "boolean") {
                return false;
            }
            return true;
        });
    }
    isValidPassengers() {
        if (!Array.isArray(this.passengers))
            return false;
        return this.passengers.every((passenger) => {
            return typeof passenger.name === "string";
        });
    }
    isValidAdditionalDetails() {
        if (!this.additionalDetails)
            return true;
        const { notes, signature, date, agentRemarks } = this.additionalDetails;
        if (date && !(date instanceof Date)) {
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
    getAgentInfo() {
        return this.agentInfo;
    }
    getVehicleInfo() {
        return this.vehicleInfo;
    }
    getDriverInfo() {
        return this.driverInfo;
    }
    getAccidentDetails() {
        return this.accidentDetails;
    }
    getThirdParty() {
        return this.thirdParty;
    }
    getInjuries() {
        return this.injuries;
    }
    getWitnesses() {
        return this.witnesses;
    }
    getPassengers() {
        return this.passengers;
    }
    getAdditionalDetails() {
        return this.additionalDetails;
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
    addInjury(injury) {
        this.injuries.push(injury);
        this.updatedAt = new Date();
    }
    addWitness(witness) {
        this.witnesses.push(witness);
        this.updatedAt = new Date();
    }
    addPassenger(passenger) {
        this.passengers.push(passenger);
        this.updatedAt = new Date();
    }
    setThirdParty(thirdParty) {
        this.thirdParty = thirdParty;
        this.updatedAt = new Date();
    }
    setAdditionalDetails(additionalDetails) {
        this.additionalDetails = additionalDetails;
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            agentInfo: this.agentInfo,
            vehicleInfo: this.vehicleInfo,
            driverInfo: this.driverInfo,
            accidentDetails: this.accidentDetails,
            thirdParty: this.thirdParty,
            injuries: this.injuries,
            witnesses: this.witnesses,
            passengers: this.passengers,
            additionalDetails: this.additionalDetails,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(data) {
        return new PalestineAccidentReport({
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        });
    }
    static create(data) {
        return new PalestineAccidentReport(data);
    }
}
//# sourceMappingURL=PalestineAccidentReport.entity.js.map