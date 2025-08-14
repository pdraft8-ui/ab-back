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
    getCustomerByIdNumber(idNumber: any): Promise<CustomerEntity>;
    getCustomerByPhoneNumber(phoneNumber: any): Promise<CustomerEntity>;
    getCustomersByAgent(agentId: any): Promise<CustomerEntity[]>;
    getCustomersByCity(city: any): Promise<CustomerEntity[]>;
    getCustomerCount(): Promise<number>;
    addVehicleToCustomer(customerId: any, vehicleData: any): Promise<CustomerEntity>;
    removeVehicleFromCustomer(customerId: any, vehicleId: any): Promise<CustomerEntity>;
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
    getVehicleByPlateNumber(plateNumber: any): Promise<import("mongoose").Types.Subdocument<import("bson").ObjectId, any, {
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
    getCustomerStats(filters?: {}): Promise<any>;
    mapToEntity(customerDoc: any): CustomerEntity;
}
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository.js";
import { Customer as CustomerEntity } from "../../domain/entities/Customer.entity.js";
//# sourceMappingURL=MongoCustomerRepository.d.ts.map