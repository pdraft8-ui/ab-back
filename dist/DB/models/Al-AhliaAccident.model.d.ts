export default AhliAccidentReportModel;
declare const AhliAccidentReportModel: mongoose.Model<{
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    accidentDate: NativeDate;
    accidentTime: string;
    thirdPartyVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }> & {
        type?: string;
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        damageDetails?: string;
    }>;
    thirdPartyInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        profession?: string;
        injuryType?: string;
    }>;
    thirdPartyPassengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    externalWitnesses: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    policyInfo?: {
        type?: "A.C.T" | "TPL" | "COM";
        policyNumber?: string;
        durationFrom?: NativeDate;
        durationTo?: NativeDate;
    };
    customerPerson?: {
        name?: string;
    };
    driverInfo?: {
        name?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        matchesVehicle?: boolean;
    };
    declaration?: {
        declarationDate?: NativeDate;
        driverSignature?: string;
        officerSignature?: string;
        officerDate?: NativeDate;
    };
    accidentDetails?: {
        time?: string;
        accidentType?: "physical" | "material" | "physicalAndMaterial";
        location?: string;
        signature?: string;
        weather?: string;
        purposeOfUse?: string;
        sketch?: string;
        driverStatement?: string;
    };
    reportNumber?: string;
    policeNumber?: string;
    agentNumber?: string;
    vehicleInfo?: {
        licenseExpiry?: NativeDate;
        vehicleType?: string;
        usage?: string;
        manufactureYear?: string;
        registrationNumber?: string;
        registrationType?: string;
        lastTestDate?: NativeDate;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Al-AhliaAccident.model.d.ts.map