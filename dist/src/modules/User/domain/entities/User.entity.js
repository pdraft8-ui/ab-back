export class User {
    constructor(userData) {
        this.id = userData.id || null;
        this.name = userData.name || "";
        this.email = userData.email || "";
        this.phone = userData.phone || "";
        this.password = userData.password || "";
        this.departmentId = userData.departmentId || null;
        this.role = userData.role || "employee";
        this.sendCode = userData.sendCode || null;
        this.status = userData.status || "active";
        this.createdAt = userData.createdAt || new Date();
        this.updatedAt = userData.updatedAt || new Date();
    }
    // Business logic methods
    isValid() {
        return !!(this.name && this.email && this.role);
    }
    isActive() {
        return this.status === "active";
    }
    isAdmin() {
        return this.role === "admin";
    }
    isHeadOfDepartment() {
        return this.role === "headOfDepartment";
    }
    isEmployee() {
        return this.role === "employee";
    }
    isCustomer() {
        return this.role === "customer";
    }
    isAgent() {
        return this.role === "agents";
    }
    canManageEmployees() {
        return this.isAdmin() || this.isHeadOfDepartment();
    }
    canManageDepartments() {
        return this.isAdmin();
    }
    hasValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
    hasValidPhone() {
        if (!this.phone)
            return true; // Phone is optional
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        return phoneRegex.test(this.phone);
    }
    getRolePermissions() {
        const permissions = {
            admin: [
                "manage_users",
                "manage_departments",
                "manage_employees",
                "view_reports",
                "send_emails",
            ],
            headOfDepartment: ["manage_employees", "view_reports", "send_emails"],
            employee: ["view_reports"],
            customer: ["view_own_data"],
            agents: ["view_reports"],
        };
        return permissions[this.role] || [];
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            departmentId: this.departmentId,
            role: this.role,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    static fromJSON(json) {
        return new User(json);
    }
    static create(userData) {
        return new User(userData);
    }
}
//# sourceMappingURL=User.entity.js.map