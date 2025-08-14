export default AlMashreqAccidentReportModel;
declare const AlMashreqAccidentReportModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }> & {
        type?: string;
        color?: string;
        insuranceCompany?: string;
        vehicleNumber?: string;
        ownerName?: string;
        driverName?: string;
        damageDescription?: string;
        driverAddress?: string;
        ownerAddress?: string;
        insurancePolicyNumber?: string;
        makeYear?: string;
        wasParked?: boolean;
    }>;
    externalWitnesses: string[];
    personalInjuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        job?: string;
    }>;
    thirdPartyInjuredNames: string[];
    vehiclePassengers: string[];
    insurancePolicy?: {
        number?: string;
        type?: string;
        from?: NativeDate;
        to?: NativeDate;
        duration?: string;
    };
    vehicle?: {
        type?: string;
        color?: string;
        usage?: string;
        registrationNumber?: string;
        makeYear?: string;
    };
    customerPerson?: {
        name?: string;
        phone?: string;
        personalNumber?: string;
        fullAddress?: string;
    };
    driverSignature?: {
        date?: NativeDate;
        name?: string;
    };
    vehicleDamages?: string;
    branchOffice?: string;
    generalNotes?: string;
    driver?: {
        name?: string;
        phone?: string;
        idNumber?: string;
        licenseNumber?: string;
        licenseType?: string;
        age?: number;
        licenseIssueDate?: NativeDate;
        fullAddress?: string;
        job?: string;
        licenseExpiryDate?: NativeDate;
    };
    accident?: {
        time?: string;
        date?: NativeDate;
        accidentType?: string;
        accidentLocation?: string;
        passengersCount?: number;
        vehicleSpeed?: string;
        weatherCondition?: string;
        roadCondition?: string;
        damageToVehicle?: string;
        timeOfAccident?: string;
        vehicleUsedPermission?: boolean;
        accidentNotifierName?: string;
        accidentNotifierPhone?: string;
    };
    claimant?: {
        name?: string;
        signature?: string;
    };
    receiver?: {
        name?: string;
        notes?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Al-MashreqAccidentReport.model.d.ts.map