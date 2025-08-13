export class Department {
  constructor(departmentData) {
    this.id = departmentData.id || null;
    this.name = departmentData.name || "";
    this.description = departmentData.description || "";
    this.headOfDepartment = departmentData.headOfDepartment || null;
    this.role = departmentData.role || "headOfDepartment";
    this.employees = departmentData.employees || [];
    this.permissions = departmentData.permissions || [];
    this.createdAt = departmentData.createdAt || new Date();
    this.updatedAt = departmentData.updatedAt || new Date();
  }

  isValid() {
    return !!(this.name && this.description);
  }

  hasValidName() {
    return this.name && this.name.trim().length > 0;
  }

  hasValidDescription() {
    return this.description && this.description.trim().length > 0;
  }

  getEmployeeCount() {
    return this.employees ? this.employees.length : 0;
  }

  hasHeadOfDepartment() {
    return !!this.headOfDepartment;
  }

  hasEmployees() {
    return this.getEmployeeCount() > 0;
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  addPermission(permission) {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission) {
    this.permissions = this.permissions.filter((p) => p !== permission);
  }

  addEmployee(employee) {
    if (employee && employee._id) {
      const existingEmployee = this.employees.find(
        (emp) => emp._id.toString() === employee._id.toString()
      );
      if (!existingEmployee) {
        this.employees.push({
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          role: employee.role || "employee",
          status: employee.status || "active",
        });
      }
    }
  }

  removeEmployee(employeeId) {
    this.employees = this.employees.filter(
      (emp) => emp._id.toString() !== employeeId.toString()
    );
  }

  setHeadOfDepartment(user) {
    if (user && user._id) {
      this.headOfDepartment = user._id;
    }
  }

  removeHeadOfDepartment() {
    this.headOfDepartment = null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      headOfDepartment: this.headOfDepartment,
      role: this.role,
      employees: this.employees,
      permissions: this.permissions,
      employeeCount: this.getEmployeeCount(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json) {
    return new Department(json);
  }

  static create(departmentData) {
    return new Department(departmentData);
  }
}
