declare const _default: StatisticsService;
export default _default;
declare class StatisticsService {
    cache: Map<any, any>;
    cacheTimeout: number;
    getCachedData(key: any, calculationFunction: any): Promise<any>;
    getTotalCustomers(): Promise<{
        value: number;
        percentageChange: number;
        trend: string;
    }>;
    getTotalIncome(): Promise<{
        value: any;
        percentageChange: number;
        trend: string;
    }>;
    getTotalExpenses(): Promise<{
        value: number;
        percentageChange: number;
        trend: string;
    }>;
    getDueAmount(): Promise<{
        value: any;
        percentageChange: number;
        trend: string;
    }>;
    getPaymentMethodStats(): Promise<{
        visa: {
            value: any;
            percentageChange: number;
            trend: string;
        };
        cash: {
            value: any;
            percentageChange: number;
            trend: string;
        };
        bank: {
            value: any;
            percentageChange: number;
            trend: string;
        };
    }>;
    getTotalProfit(): Promise<{
        value: number;
        percentageChange: number;
        trend: string;
    }>;
    getDashboardStats(): Promise<{
        totalCustomers: any;
        totalIncome: any;
        totalExpenses: any;
        dueAmount: any;
        totalVisa: any;
        totalCash: any;
        totalBank: any;
        totalProfit: any;
        timestamp: string;
    }>;
    clearCache(): void;
    getPaymentOverview(period?: string): Promise<{
        period: string;
        data: ({
            period: string;
            year: number;
            month: number;
            amountReceived: any;
            amountDue: any;
            paymentCount: any;
            invoiceCount: any;
        } | {
            period: string;
            year: number;
            amountReceived: any;
            amountDue: any;
            paymentCount: any;
            invoiceCount: any;
            month?: undefined;
        })[];
        summary: {
            totalAmountReceived: any;
            totalAmountDue: any;
            totalPayments: any;
            totalInvoices: any;
        };
        timestamp: string;
    }>;
}
//# sourceMappingURL=Statistics.service.d.ts.map