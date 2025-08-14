declare const _default: ReportsService;
export default _default;
declare class ReportsService {
    cache: Map<any, any>;
    cacheTimeout: number;
    getCachedData(key: any, calculationFunction: any): Promise<any>;
    getChequeReport(filters?: {}): Promise<{
        cheques: (import("mongoose").FlattenMaps<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
            customer: import("mongoose").Types.ObjectId;
            createdBy: import("mongoose").Types.ObjectId;
            customerName: string;
            customerPhone: string;
            chequeNumber: string;
            chequeAmount: number;
            chequeDate: NativeDate;
            chequeStatus: "pending" | "cancelled" | "cleared" | "bounced" | "on_hold";
            bankName: string;
            notes?: string;
            updatedBy?: import("mongoose").Types.ObjectId;
            accountNumber?: string;
            chequeImage?: string;
            clearedDate?: NativeDate;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalCount: number;
            totalPages: number;
        };
        summary: any;
        filters: {
            startDate: any;
            endDate: any;
            status: any;
            sortBy: any;
            sortOrder: any;
        };
    }>;
    getDueAmountsReport(filters?: {}): Promise<{
        invoices: (import("mongoose").FlattenMaps<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
            description: string;
            customer: import("mongoose").Types.ObjectId;
            insurancePolicy: import("mongoose").Types.ObjectId;
            invoiceDate: NativeDate;
            dueDate: NativeDate;
            status: "Pending" | "Partially Paid" | "Paid" | "Overdue";
            totalAmount: number;
            balanceDue: number;
            createdBy: import("mongoose").Types.ObjectId;
            notes?: string;
            invoiceNumber?: string;
            vehicle?: import("mongoose").Types.ObjectId;
            updatedBy?: import("mongoose").Types.ObjectId;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalCount: number;
            totalPages: number;
        };
        summary: any;
        filters: {
            startDate: any;
            endDate: any;
            status: any;
            sortBy: any;
            sortOrder: any;
        };
    }>;
    getAgentCustomersReport(filters?: {}): Promise<{
        customers: (import("mongoose").FlattenMaps<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
            first_name: string;
            last_name: string;
            id_Number: number;
            phone_number: string;
            joining_date: NativeDate;
            city: string;
            birth_date: NativeDate;
            vehicles: import("mongoose").Types.DocumentArray<{
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            insurances: import("mongoose").Types.DocumentArray<{
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            agentsId?: import("mongoose").Types.ObjectId;
            agentsName?: string;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalCount: number;
            totalPages: number;
        };
        summary: any;
        filters: {
            agentId: any;
            startDate: any;
            endDate: any;
            sortBy: any;
            sortOrder: any;
        };
    }>;
    getAgentInsurancesReport(filters?: {}): Promise<{
        customers: (import("mongoose").FlattenMaps<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
            first_name: string;
            last_name: string;
            id_Number: number;
            phone_number: string;
            joining_date: NativeDate;
            city: string;
            birth_date: NativeDate;
            vehicles: import("mongoose").Types.DocumentArray<{
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            insurances: import("mongoose").Types.DocumentArray<{
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            agentsId?: import("mongoose").Types.ObjectId;
            agentsName?: string;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalCount: number;
            totalPages: number;
        };
        summary: any;
        filters: {
            agentId: any;
            insuranceType: any;
            startDate: any;
            endDate: any;
            sortBy: any;
            sortOrder: any;
        };
    }>;
    getExpiredInsuranceReport(filters?: {}): Promise<{
        customers: (import("mongoose").FlattenMaps<{
            createdAt: NativeDate;
            updatedAt: NativeDate;
            first_name: string;
            last_name: string;
            id_Number: number;
            phone_number: string;
            joining_date: NativeDate;
            city: string;
            birth_date: NativeDate;
            vehicles: import("mongoose").Types.DocumentArray<{
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                insurance: import("mongoose").Types.DocumentArray<{
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
                    checkDetails: import("mongoose").Types.DocumentArray<{
                        isReturned: boolean;
                        checkNumber?: string;
                        checkDueDate?: NativeDate;
                        checkAmount?: number;
                        checkImage?: string;
                    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            insurances: import("mongoose").Types.DocumentArray<{
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
            }, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
            agentsId?: import("mongoose").Types.ObjectId;
            agentsName?: string;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            totalCount: number;
            totalPages: number;
        };
        summary: any;
        filters: {
            daysThreshold: any;
            includeExpired: any;
            sortBy: any;
            sortOrder: any;
        };
    }>;
    clearCache(): void;
}
//# sourceMappingURL=Reports.service.d.ts.map