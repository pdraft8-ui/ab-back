export class MongoCustomerRepository extends ICustomerRepository {
    createCustomer(customerData: any): Promise<CustomerEntity>;
    getCustomerById(id: any): Promise<CustomerEntity>;
    getAllCustomers(filters?: {}): Promise<{
        customers: CustomerEntity[];
        pagination: {
            page: any;
            limit: any;
            total: number;
            pages: number;
        };
    }>;
    updateCustomer(id: any, updateData: any): Promise<CustomerEntity>;
    deleteCustomer(id: any): Promise<CustomerEntity>;
    getCustomerByInvoiceId(invoiceId: any): Promise<CustomerEntity>;
    getCustomerByIdNumber(idNumber: any): Promise<CustomerEntity>;
    getCustomerByPhoneNumber(phoneNumber: any): Promise<CustomerEntity>;
    getCustomersByAgent(agentId: any): Promise<CustomerEntity[]>;
    getCustomersByCity(city: any): Promise<CustomerEntity[]>;
    getCustomerCount(): Promise<number>;
    getCustomersByMonth(): Promise<any[]>;
    getCustomersByDateRange(startDate: any, endDate: any): Promise<CustomerEntity[]>;
    addVehicleToCustomer(customerId: any, vehicleData: any): Promise<CustomerEntity>;
    removeVehicleFromCustomer(customerId: any, vehicleId: any): Promise<CustomerEntity>;
    updateVehicle(customerId: any, vehicleId: any, updateData: any): Promise<CustomerEntity>;
    getCustomerVehicles(customerId: any): Promise<any[] | import("mongoose").Types.DocumentArray<{
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
    }>>;
    getVehicleByPlateNumber(plateNumber: any): Promise<CustomerEntity>;
    addInsuranceToVehicle(customerId: any, vehicleId: any, insuranceData: any): Promise<CustomerEntity>;
    removeInsuranceFromVehicle(customerId: any, vehicleId: any, insuranceId: any): Promise<CustomerEntity>;
    updateVehicleInsurance(customerId: any, vehicleId: any, insuranceId: any, updateData: any): Promise<CustomerEntity>;
    getVehicleInsurances(customerId: any, vehicleId: any): Promise<any[] | import("mongoose").Types.DocumentArray<{
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
    }>>;
    getAllVehicleInsurances(): Promise<any[]>;
    getAllInsurancesData(): Promise<any[]>;
    addCustomerInsurance(customerId: any, insuranceData: any): Promise<CustomerEntity>;
    removeCustomerInsurance(customerId: any, insuranceId: any): Promise<CustomerEntity>;
    updateCustomerInsurance(customerId: any, insuranceId: any, updateData: any): Promise<CustomerEntity>;
    getCustomerInsurances(customerId: any): Promise<any[] | import("mongoose").Types.DocumentArray<{
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
    }>>;
    getAllCustomerInsurances(customerId: any): Promise<{
        customerName: string;
        customerId: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }[]>;
    getInsuranceById(insuranceId: any): Promise<{
        customerName: string;
        customerId: import("mongoose").Types.ObjectId;
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
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }>;
    deleteInsuranceById(insuranceId: any): Promise<CustomerEntity>;
    addCheckToInsurance(customerId: any, vehicleId: any, insuranceId: any, checkData: any): Promise<CustomerEntity>;
    removeCheckFromInsurance(customerId: any, vehicleId: any, checkId: any): Promise<CustomerEntity>;
    getInsuranceChecks(customerId: any, vehicleId: any, insuranceId: any): Promise<any[] | import("mongoose").Types.DocumentArray<{
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
    }>>;
    getAllChecksForVehicle(customerId: any, vehicleId: any): Promise<any[]>;
    getCustomerStats(filters?: {}): Promise<any>;
    getVehicleStats(): Promise<any>;
    getInsuranceStats(): Promise<any>;
    mapToEntity(customerDoc: any): CustomerEntity;
}
import { ICustomerRepository } from "../../core/interfaces/ICustomerRepository.js";
import { Customer as CustomerEntity } from "../../core/entities/Customer.entity.js";
//# sourceMappingURL=MongoCustomerRepository.d.ts.map