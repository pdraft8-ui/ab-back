export default Customer;
declare const Customer: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
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
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    first_name: string;
    last_name: string;
    id_Number: number;
    phone_number: string;
    joining_date: NativeDate;
    city: string;
    birth_date: NativeDate;
    vehicles: mongoose.Types.DocumentArray<{
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }> & {
        type: string;
        model: string;
        image: string;
        plateNumber: number;
        ownership: string;
        modelNumber: string;
        licenseExpiry: NativeDate;
        lastTest: NativeDate;
        color: string;
        price: number;
        insurance: mongoose.Types.DocumentArray<{
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }> & {
            insuranceStartDate: NativeDate;
            insuranceEndDate: NativeDate;
            isUnder24: boolean;
            insuranceCategory: "CarInsurance";
            insuranceType: string;
            insuranceCompany: string;
            paymentMethod: "cash" | "card" | "bank_transfer" | "check";
            insuranceAmount: number;
            paidAmount: number;
            insuranceFiles: string[];
            checkDetails: mongoose.Types.DocumentArray<{
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }> & {
                isReturned: boolean;
                checkNumber?: string;
                checkDueDate?: NativeDate;
                checkAmount?: number;
                checkImage?: string;
            }>;
            agent?: string;
            remainingDebt?: number;
        }>;
    }>;
    insurances: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
        insuranceType: "Health Insurance" | "Life Insurance" | "Property Insurance" | "Travel Insurance" | "Civil Liability Insurance" | "Corporate Insurance";
        insuranceCompany: string;
        insuranceAmount: number;
        insuranceFiles: string[];
        policyNumber: string;
        issueDate: NativeDate;
        expirationDate: NativeDate;
        premiumAmount: number;
        premiumFrequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
        premiumPaymentMethod: "cash" | "card" | "bank_transfer" | "check";
        policyStatus: "Cancelled" | "Active" | "Expired" | "Suspended";
        coverageDetails: string;
        beneficiaries: string[];
        notes?: string;
        agent?: string;
    }>;
    image?: string;
    notes?: string;
    email?: string;
    agentsId?: mongoose.Types.ObjectId;
    agentsName?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
import mongoose from "mongoose";
//# sourceMappingURL=Customer.model.d.ts.map