export class RoadService {
    constructor(data) {
        this.id = data.id || data._id;
        this.companyName = data.companyName;
        this.serviceType = data.serviceType || "خدمات طريق";
        this.amount = data.amount;
        this.amountUnder2007 = data.amountUnder2007;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    isValid() {
        return !!(this.companyName &&
            this.amount &&
            this.amountUnder2007 &&
            this.isValidAmount(this.amount) &&
            this.isValidAmount(this.amountUnder2007));
    }
    isValidAmount(amount) {
        return typeof amount === "number" && amount >= 0;
    }
    isUnder2007() {
        return this.amountUnder2007 < 2007;
    }
    getServiceType() {
        return this.serviceType;
    }
    getCompanyName() {
        return this.companyName;
    }
    getAmount() {
        return this.amount;
    }
    getAmountUnder2007() {
        return this.amountUnder2007;
    }
    updateService(data) {
        if (data.companyName)
            this.companyName = data.companyName;
        if (data.serviceType)
            this.serviceType = data.serviceType;
        if (data.amount !== undefined)
            this.amount = data.amount;
        if (data.amountUnder2007 !== undefined)
            this.amountUnder2007 = data.amountUnder2007;
        this.updatedAt = new Date();
        return this;
    }
    toJSON() {
        return {
            id: this.id,
            companyName: this.companyName,
            serviceType: this.serviceType,
            amount: this.amount,
            amountUnder2007: this.amountUnder2007,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(data) {
        return new RoadService(data);
    }
    static create(data) {
        return new RoadService(data);
    }
}
//# sourceMappingURL=RoadService.entity.js.map