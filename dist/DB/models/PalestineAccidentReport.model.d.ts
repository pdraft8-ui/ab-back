export default PalestineAccidentReportModel;
declare const PalestineAccidentReportModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    witnesses: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }> & {
        name?: string;
        address?: string;
        statementGiven?: boolean;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
    }> & {
        name?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
    }>;
    driverInfo?: {
        name?: string;
        address?: string;
        idNumber?: string;
        age?: number;
        occupation?: string;
        license?: {
            number?: string;
            type?: string;
            issueDate?: NativeDate;
            expiryDate?: NativeDate;
        };
    };
    accidentDetails?: {
        policeInformed: boolean;
        time?: string;
        accidentDate?: NativeDate;
        location?: string;
        numberOfPassengers?: number;
        vehicleSpeed?: number;
        vehiclePurposeAtTime?: string;
        accidentDescription?: string;
        responsibleParty?: string;
        policeStation?: string;
    };
    vehicleInfo?: {
        color?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        usage?: string;
        documentDate?: NativeDate;
        make?: string;
        modelYear?: string;
        ownerID?: string;
        registrationExpiry?: NativeDate;
    };
    agentInfo?: {
        agentName?: string;
        insurancePeriod?: {
            from?: NativeDate;
            to?: NativeDate;
        };
        documentNumber?: string;
        documentType?: "thirdParty" | "comprehensive";
    };
    thirdParty?: {
        model?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        ownerAddress?: string;
        ownerPhone?: string;
        driverPhone?: string;
        insurancePolicyNumber?: string;
        make?: string;
        vehicleDamages?: string;
    };
    additionalDetails?: {
        date?: NativeDate;
        notes?: string;
        signature?: string;
        agentRemarks?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=PalestineAccidentReport.model.d.ts.map