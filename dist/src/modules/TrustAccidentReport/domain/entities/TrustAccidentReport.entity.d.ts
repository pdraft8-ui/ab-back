export class TrustAccidentReport {
    static fromJSON(json: any): TrustAccidentReport;
    static create(data: any): TrustAccidentReport;
    constructor(data: any);
    id: any;
    customerId: any;
    accidentDetails: {
        location: any;
        date: any;
        time: any;
        accidentType: any;
        reportDate: any;
    };
    customerVehicle: {
        plateNumber: any;
        type: any;
        model: any;
        color: any;
        ownership: any;
        usage: any;
        manufactureYear: any;
        chassisNumber: any;
        testExpiry: any;
        insuranceCompany: any;
        policyNumber: any;
        insuranceType: any;
        insurancePeriod: {
            from: any;
            to: any;
        };
    };
    driverDetails: {
        name: any;
        birthDate: any;
        address: any;
        licenseNumber: any;
        licenseType: any;
        licenseExpiry: any;
        relationToCustomer: any;
    };
    damages: {
        front: any;
        back: any;
        right: any;
        left: any;
        estimatedCost: any;
        garageName: any;
        towCompany: any;
    };
    otherVehicle: {
        plateNumber: any;
        type: any;
        model: any;
        color: any;
        insuranceCompany: any;
        driverName: any;
        driverAddress: any;
        licenseNumber: any;
        damageDescription: any;
    };
    witnesses: any;
    policeReport: {
        reportDate: any;
        authority: any;
        sketchDrawn: any;
        officersPresent: any;
    };
    narration: any;
    signature: any;
    declaration: {
        declarerName: any;
        declarationDate: any;
        reviewerName: any;
        reviewerSignature: any;
        reviewDate: any;
    };
    createdAt: any;
    updatedAt: any;
    isValid(): any;
    isValidCustomerId(): boolean;
    isValidAccidentDetails(): any;
    isValidCustomerVehicle(): any;
    isValidDriverDetails(): any;
    isValidDamages(): any;
    isValidOtherVehicle(): any;
    isValidWitnesses(): boolean;
    isValidPoliceReport(): boolean;
    isValidNarration(): boolean;
    isValidSignature(): boolean;
    isValidDeclaration(): any;
    getCustomerId(): any;
    getAccidentDetails(): {
        location: any;
        date: any;
        time: any;
        accidentType: any;
        reportDate: any;
    };
    getCustomerVehicle(): {
        plateNumber: any;
        type: any;
        model: any;
        color: any;
        ownership: any;
        usage: any;
        manufactureYear: any;
        chassisNumber: any;
        testExpiry: any;
        insuranceCompany: any;
        policyNumber: any;
        insuranceType: any;
        insurancePeriod: {
            from: any;
            to: any;
        };
    };
    getDriverDetails(): {
        name: any;
        birthDate: any;
        address: any;
        licenseNumber: any;
        licenseType: any;
        licenseExpiry: any;
        relationToCustomer: any;
    };
    getDamages(): {
        front: any;
        back: any;
        right: any;
        left: any;
        estimatedCost: any;
        garageName: any;
        towCompany: any;
    };
    getOtherVehicle(): {
        plateNumber: any;
        type: any;
        model: any;
        color: any;
        insuranceCompany: any;
        driverName: any;
        driverAddress: any;
        licenseNumber: any;
        damageDescription: any;
    };
    getWitnesses(): any;
    getPoliceReport(): {
        reportDate: any;
        authority: any;
        sketchDrawn: any;
        officersPresent: any;
    };
    getNarration(): any;
    getSignature(): any;
    getDeclaration(): {
        declarerName: any;
        declarationDate: any;
        reviewerName: any;
        reviewerSignature: any;
        reviewDate: any;
    };
    updateAccidentReport(updateData: any): void;
    toJSON(): {
        id: any;
        customerId: any;
        accidentDetails: {
            location: any;
            date: any;
            time: any;
            accidentType: any;
            reportDate: any;
        };
        customerVehicle: {
            plateNumber: any;
            type: any;
            model: any;
            color: any;
            ownership: any;
            usage: any;
            manufactureYear: any;
            chassisNumber: any;
            testExpiry: any;
            insuranceCompany: any;
            policyNumber: any;
            insuranceType: any;
            insurancePeriod: {
                from: any;
                to: any;
            };
        };
        driverDetails: {
            name: any;
            birthDate: any;
            address: any;
            licenseNumber: any;
            licenseType: any;
            licenseExpiry: any;
            relationToCustomer: any;
        };
        damages: {
            front: any;
            back: any;
            right: any;
            left: any;
            estimatedCost: any;
            garageName: any;
            towCompany: any;
        };
        otherVehicle: {
            plateNumber: any;
            type: any;
            model: any;
            color: any;
            insuranceCompany: any;
            driverName: any;
            driverAddress: any;
            licenseNumber: any;
            damageDescription: any;
        };
        witnesses: any;
        policeReport: {
            reportDate: any;
            authority: any;
            sketchDrawn: any;
            officersPresent: any;
        };
        narration: any;
        signature: any;
        declaration: {
            declarerName: any;
            declarationDate: any;
            reviewerName: any;
            reviewerSignature: any;
            reviewDate: any;
        };
        createdAt: any;
        updatedAt: any;
    };
}
//# sourceMappingURL=TrustAccidentReport.entity.d.ts.map