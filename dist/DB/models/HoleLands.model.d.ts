export default HoliAccidentReportModel;
declare const HoliAccidentReportModel: mongoose.Model<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }> & {
        model?: string;
        plateNumber?: string;
        insuranceCompany?: string;
        vehicleType?: string;
        vehicleNumber?: string;
        driverName?: string;
        driverAddress?: string;
        make?: string;
        details?: string;
    }>;
    injuries: mongoose.Types.DocumentArray<{
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }> & {
        name?: string;
        address?: string;
        age?: number;
        injuryType?: string;
        occupation?: string;
        maritalStatus?: string;
    }>;
    accidentDetails?: {
        accidentDate?: NativeDate;
        accidentLocation?: string;
        accidentTime?: string;
        numberOfPassengers?: number;
        speedAtTime?: string;
        lightsUsed?: string;
        directionFrom?: string;
        accidentDirection?: string;
        accidentDetailsText?: string;
        accidentCause?: string;
        notesByBranchManager?: string;
        policeNotified?: boolean;
        whoInformedPolice?: string;
    };
    signature?: string;
    additionalDetails?: string;
    injuredNamesAndAddresses?: string;
    passengerNamesAndAddresses?: string;
    signatureDate?: NativeDate;
    employeeNotes?: string;
    employeeSignature?: string;
    employeeDate?: NativeDate;
    insuranceDetails?: {
        insuranceType?: string;
        policyNumber?: string;
        vehicleNumber?: string;
        insuranceDuration?: string;
        fromDate?: NativeDate;
        toDate?: NativeDate;
    };
    vehicleDetails?: {
        plateNumber?: string;
        chassisNumber?: string;
        modelYear?: number;
        vehicleColor?: string;
        vehicleBranch?: string;
        vehicleUsage?: string;
    };
    ownerAndDriverDetails?: {
        ownerName?: string;
        driverName?: string;
        driverAddress?: string;
        licenseIssueDate?: NativeDate;
        driverPhone?: string;
        licenseExpiryDate?: NativeDate;
        driverID?: string;
        driverLicenseNumber?: string;
        driverLicenseGrade?: string;
        driverProfession?: string;
        licenseIssuePlace?: string;
    };
    involvementDetails?: {
        damageToUserCar?: string;
        damageToThirdParty?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=HoleLands.model.d.ts.map