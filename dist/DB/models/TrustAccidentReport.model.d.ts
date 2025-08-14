export default TrustAccidentReportModel;
declare const TrustAccidentReportModel: mongoose.Model<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name: string;
        phone: string;
        address: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        phone: string;
        address: string;
    }> & {
        name: string;
        phone: string;
        address: string;
    }>;
    narration: string;
    signature: string;
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        ownership: string;
        color: string;
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        usage: string;
        manufactureYear: string;
        chassisNumber: string;
        testExpiry: NativeDate;
        insurancePeriod?: {
            from: NativeDate;
            to: NativeDate;
        };
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        reviewerName: string;
        reviewerSignature: string;
        reviewDate: NativeDate;
    };
    accidentDetails?: {
        time: string;
        date: NativeDate;
        reportDate: NativeDate;
        accidentType: string;
        location: string;
    };
    driverDetails?: {
        name: string;
        licenseExpiry: NativeDate;
        address: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
        birthDate: NativeDate;
    };
    damages?: {
        front: string;
        back: string;
        left: string;
        right: string;
        estimatedCost: string;
        garageName: string;
        towCompany: string;
    };
    otherVehicle?: {
        type: string;
        model: string;
        plateNumber: string;
        color: string;
        insuranceCompany: string;
        licenseNumber: string;
        driverName: string;
        damageDescription: string;
        driverAddress: string;
    };
    policeReport?: {
        reportDate: NativeDate;
        sketchDrawn: boolean;
        authority: string;
        officersPresent: boolean;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=TrustAccidentReport.model.d.ts.map