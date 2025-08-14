export default TakafulAccidentReportModel;
declare const TakafulAccidentReportModel: mongoose.Model<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    customerId: mongoose.Types.ObjectId;
    otherVehicles: mongoose.Types.DocumentArray<{
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }> & {
        insuranceType: string;
        insuranceCompany: string;
        policyNumber: string;
        phone: string;
        address: string;
        vehicleNumber: string;
        ownerName: string;
        driverName: string;
        colorAndType: string;
        totalWeight: string;
        damageDescription: string;
    }>;
    passengers: mongoose.Types.DocumentArray<{
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }> & {
        name: string;
        address: string;
        age: number;
        hospital: string;
        injuryDescription: string;
    }>;
    accidentNarration: string;
    notifierSignature: string;
    receiverName: string;
    receiverNotes: string;
    accidentInfo?: {
        reportDate: NativeDate;
        accidentDate: NativeDate;
        accidentType: string;
        accidentLocation: string;
        accidentTime: string;
        passengersCount: number;
        agentName: string;
    };
    policyInfo?: {
        policyNumber: string;
        issueDate: NativeDate;
        branch: string;
        durationFrom: NativeDate;
        durationTo: NativeDate;
        isFullCoverage: boolean;
        fullCoverageFee: string;
        isThirdParty: boolean;
        thirdPartyFee: string;
        isMandatory: boolean;
        maxAllowedPassengers: number;
    };
    customerPerson?: {
        name: string;
        address: string;
        residence: string;
        workAddress: string;
        workPhone: string;
    };
    driverInfo?: {
        name: string;
        licenseExpiry: NativeDate;
        phoneNumber: string;
        idNumber: string;
        licenseNumber: string;
        licenseType: string;
        relationToCustomer: string;
    };
    licenseInfo?: {
        issueDate: NativeDate;
        licenseNumber: string;
        licenseType: string;
        expiryDate: NativeDate;
        matchesVehicleType: boolean;
    };
    customerVehicle?: {
        type: string;
        model: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        damage?: {
            front: string;
            back: string;
            left: string;
            right: string;
            estimatedValue: string;
            towingCompany: string;
            garage: string;
        };
    };
    policeAndWitnesses?: {
        reportedDate: NativeDate;
        policeAuthority: string;
        sketchDrawn: boolean;
        policeCame: boolean;
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
    };
    declaration?: {
        declarerName: string;
        declarationDate: NativeDate;
        documentCheckerName: string;
        checkerJob: string;
        checkerSignature: string;
        checkerDate: NativeDate;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=TakafulAccidentReport.model.d.ts.map