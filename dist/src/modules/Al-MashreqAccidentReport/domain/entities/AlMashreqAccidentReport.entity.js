export class AlMashreqAccidentReport {
    constructor({ id = null, customerId, branchOffice = "", insurancePolicy = {}, customerPerson = {}, vehicle = {}, driver = {}, accident = {}, otherVehicles = [], vehicleDamages = "", personalInjuries = [], thirdPartyInjuredNames = [], vehiclePassengers = [], externalWitnesses = [], driverSignature = {}, claimant = {}, receiver = {}, generalNotes = "", createdAt = new Date(), updatedAt = new Date(), }) {
        this.id = id;
        this.customerId = customerId;
        this.branchOffice = branchOffice;
        this.insurancePolicy = insurancePolicy;
        this.customerPerson = customerPerson;
        this.vehicle = vehicle;
        this.driver = driver;
        this.accident = accident;
        this.otherVehicles = otherVehicles;
        this.vehicleDamages = vehicleDamages;
        this.personalInjuries = personalInjuries;
        this.thirdPartyInjuredNames = thirdPartyInjuredNames;
        this.vehiclePassengers = vehiclePassengers;
        this.externalWitnesses = externalWitnesses;
        this.driverSignature = driverSignature;
        this.claimant = claimant;
        this.receiver = receiver;
        this.generalNotes = generalNotes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isValid() {
        return (this.isValidCustomerId() &&
            this.isValidInsurancePolicy() &&
            this.isValidCustomerPerson() &&
            this.isValidVehicle() &&
            this.isValidDriver() &&
            this.isValidAccident() &&
            this.isValidOtherVehicles() &&
            this.isValidPersonalInjuries() &&
            this.isValidDriverSignature() &&
            this.isValidClaimant() &&
            this.isValidReceiver());
    }
    isValidCustomerId() {
        return this.customerId && typeof this.customerId === "string";
    }
    isValidInsurancePolicy() {
        if (!this.insurancePolicy)
            return true;
        const { type, number, duration, from, to } = this.insurancePolicy;
        if (from && !(from instanceof Date)) {
            return false;
        }
        if (to && !(to instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidCustomerPerson() {
        if (!this.customerPerson)
            return true;
        const { name, personalNumber, fullAddress, phone } = this.customerPerson;
        return true;
    }
    isValidVehicle() {
        if (!this.vehicle)
            return true;
        const { registrationNumber, usage, type, makeYear, color } = this.vehicle;
        return true;
    }
    isValidDriver() {
        if (!this.driver)
            return true;
        const { name, job, fullAddress, phone, licenseNumber, licenseType, licenseIssueDate, licenseExpiryDate, age, idNumber, } = this.driver;
        if (licenseIssueDate && !(licenseIssueDate instanceof Date)) {
            return false;
        }
        if (licenseExpiryDate && !(licenseExpiryDate instanceof Date)) {
            return false;
        }
        if (age && typeof age !== "number") {
            return false;
        }
        return true;
    }
    isValidAccident() {
        if (!this.accident)
            return true;
        const { date, time, weatherCondition, roadCondition, accidentLocation, accidentType, damageToVehicle, vehicleSpeed, timeOfAccident, passengersCount, vehicleUsedPermission, accidentNotifierName, accidentNotifierPhone, } = this.accident;
        if (date && !(date instanceof Date)) {
            return false;
        }
        if (passengersCount && typeof passengersCount !== "number") {
            return false;
        }
        if (vehicleUsedPermission !== undefined &&
            typeof vehicleUsedPermission !== "boolean") {
            return false;
        }
        return true;
    }
    isValidOtherVehicles() {
        if (!Array.isArray(this.otherVehicles))
            return false;
        return this.otherVehicles.every((vehicle) => {
            const { vehicleNumber, type, makeYear, color, ownerName, ownerAddress, driverName, driverAddress, insuranceCompany, insurancePolicyNumber, wasParked, damageDescription, } = vehicle;
            if (wasParked !== undefined && typeof wasParked !== "boolean") {
                return false;
            }
            return true;
        });
    }
    isValidPersonalInjuries() {
        if (!Array.isArray(this.personalInjuries))
            return false;
        return this.personalInjuries.every((injury) => {
            const { name, age, job, address, injuryType } = injury;
            if (age && typeof age !== "number") {
                return false;
            }
            return true;
        });
    }
    isValidDriverSignature() {
        if (!this.driverSignature)
            return true;
        const { name, date } = this.driverSignature;
        if (date && !(date instanceof Date)) {
            return false;
        }
        return true;
    }
    isValidClaimant() {
        if (!this.claimant)
            return true;
        const { name, signature } = this.claimant;
        return true;
    }
    isValidReceiver() {
        if (!this.receiver)
            return true;
        const { name, notes } = this.receiver;
        return true;
    }
    // Getters
    getId() {
        return this.id;
    }
    getCustomerId() {
        return this.customerId;
    }
    getBranchOffice() {
        return this.branchOffice;
    }
    getInsurancePolicy() {
        return this.insurancePolicy;
    }
    getCustomerPerson() {
        return this.customerPerson;
    }
    getVehicle() {
        return this.vehicle;
    }
    getDriver() {
        return this.driver;
    }
    getAccident() {
        return this.accident;
    }
    getOtherVehicles() {
        return this.otherVehicles;
    }
    getVehicleDamages() {
        return this.vehicleDamages;
    }
    getPersonalInjuries() {
        return this.personalInjuries;
    }
    getThirdPartyInjuredNames() {
        return this.thirdPartyInjuredNames;
    }
    getVehiclePassengers() {
        return this.vehiclePassengers;
    }
    getExternalWitnesses() {
        return this.externalWitnesses;
    }
    getDriverSignature() {
        return this.driverSignature;
    }
    getClaimant() {
        return this.claimant;
    }
    getReceiver() {
        return this.receiver;
    }
    getGeneralNotes() {
        return this.generalNotes;
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
    addPersonalInjury(injury) {
        this.personalInjuries.push(injury);
        this.updatedAt = new Date();
    }
    addThirdPartyInjuredName(name) {
        this.thirdPartyInjuredNames.push(name);
        this.updatedAt = new Date();
    }
    addVehiclePassenger(passenger) {
        this.vehiclePassengers.push(passenger);
        this.updatedAt = new Date();
    }
    addExternalWitness(witness) {
        this.externalWitnesses.push(witness);
        this.updatedAt = new Date();
    }
    setDriverSignature(signature) {
        this.driverSignature = signature;
        this.updatedAt = new Date();
    }
    setClaimant(claimant) {
        this.claimant = claimant;
        this.updatedAt = new Date();
    }
    setReceiver(receiver) {
        this.receiver = receiver;
        this.updatedAt = new Date();
    }
    toJSON() {
        return {
            id: this.id,
            customerId: this.customerId,
            branchOffice: this.branchOffice,
            insurancePolicy: this.insurancePolicy,
            customerPerson: this.customerPerson,
            vehicle: this.vehicle,
            driver: this.driver,
            accident: this.accident,
            otherVehicles: this.otherVehicles,
            vehicleDamages: this.vehicleDamages,
            personalInjuries: this.personalInjuries,
            thirdPartyInjuredNames: this.thirdPartyInjuredNames,
            vehiclePassengers: this.vehiclePassengers,
            externalWitnesses: this.externalWitnesses,
            driverSignature: this.driverSignature,
            claimant: this.claimant,
            receiver: this.receiver,
            generalNotes: this.generalNotes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(data) {
        return new AlMashreqAccidentReport({
            ...data,
            insurancePolicy: {
                ...data.insurancePolicy,
                from: data.insurancePolicy?.from
                    ? new Date(data.insurancePolicy.from)
                    : null,
                to: data.insurancePolicy?.to ? new Date(data.insurancePolicy.to) : null,
            },
            driver: {
                ...data.driver,
                licenseIssueDate: data.driver?.licenseIssueDate
                    ? new Date(data.driver.licenseIssueDate)
                    : null,
                licenseExpiryDate: data.driver?.licenseExpiryDate
                    ? new Date(data.driver.licenseExpiryDate)
                    : null,
            },
            accident: {
                ...data.accident,
                date: data.accident?.date ? new Date(data.accident.date) : null,
            },
            driverSignature: {
                ...data.driverSignature,
                date: data.driverSignature?.date
                    ? new Date(data.driverSignature.date)
                    : null,
            },
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
            updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
        });
    }
    static create(data) {
        return new AlMashreqAccidentReport(data);
    }
}
//# sourceMappingURL=AlMashreqAccidentReport.entity.js.map