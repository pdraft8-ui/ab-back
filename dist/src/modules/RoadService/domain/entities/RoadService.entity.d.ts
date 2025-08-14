export class RoadService {
    static fromJSON(data: any): RoadService;
    static create(data: any): RoadService;
    constructor(data: any);
    id: any;
    companyName: any;
    serviceType: any;
    amount: any;
    amountUnder2007: any;
    createdAt: any;
    updatedAt: any;
    isValid(): boolean;
    isValidAmount(amount: any): boolean;
    isUnder2007(): boolean;
    getServiceType(): any;
    getCompanyName(): any;
    getAmount(): any;
    getAmountUnder2007(): any;
    updateService(data: any): this;
    toJSON(): {
        id: any;
        companyName: any;
        serviceType: any;
        amount: any;
        amountUnder2007: any;
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=RoadService.entity.d.ts.map