export class Vehicle {
  constructor(vehicleData) {
    this.id = vehicleData.id || null;
    this.customerId = vehicleData.customerId || null;
    this.plateNumber = vehicleData.plateNumber || null;
    this.model = vehicleData.model || "";
    this.type = vehicleData.type || "";
    this.ownership = vehicleData.ownership || "";
    this.modelNumber = vehicleData.modelNumber || "";
    this.licenseExpiry = vehicleData.licenseExpiry || null;
    this.lastTest = vehicleData.lastTest || null;
    this.color = vehicleData.color || "";
    this.price = vehicleData.price || 0;
    this.image = vehicleData.image || "";
    this.insurance = vehicleData.insurance || [];
    this.createdAt = vehicleData.createdAt || new Date();
    this.updatedAt = vehicleData.updatedAt || new Date();
  }

  isValid() {
    return !!(
      this.customerId &&
      this.plateNumber &&
      this.model &&
      this.type &&
      this.ownership &&
      this.modelNumber &&
      this.licenseExpiry &&
      this.lastTest &&
      this.color &&
      this.price > 0
    );
  }

  hasValidPlateNumber() {
    return this.plateNumber && this.plateNumber > 0;
  }

  hasValidCustomer() {
    return !!this.customerId;
  }

  hasInsurance() {
    return this.insurance && this.insurance.length > 0;
  }

  getActiveInsurance() {
    if (!this.hasInsurance()) return null;

    const now = new Date();
    return this.insurance.find((insurance) => {
      const startDate = new Date(insurance.insuranceStartDate);
      const endDate = new Date(insurance.insuranceEndDate);
      return startDate <= now && endDate >= now;
    });
  }

  getExpiredInsurance() {
    if (!this.hasInsurance()) return [];

    const now = new Date();
    return this.insurance.filter((insurance) => {
      const endDate = new Date(insurance.insuranceEndDate);
      return endDate < now;
    });
  }

  getUpcomingInsurance() {
    if (!this.hasInsurance()) return [];

    const now = new Date();
    const thirtyDaysFromNow = new Date(
      now.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    return this.insurance.filter((insurance) => {
      const endDate = new Date(insurance.insuranceEndDate);
      return endDate >= now && endDate <= thirtyDaysFromNow;
    });
  }

  hasExpiredLicense() {
    if (!this.licenseExpiry) return false;
    const now = new Date();
    const expiryDate = new Date(this.licenseExpiry);
    return expiryDate < now;
  }

  hasExpiredTest() {
    if (!this.lastTest) return false;
    const now = new Date();
    const testDate = new Date(this.lastTest);
    const oneYearFromTest = new Date(
      testDate.getTime() + 365 * 24 * 60 * 60 * 1000
    );
    return oneYearFromTest < now;
  }

  addInsurance(insuranceData) {
    if (!this.insurance) {
      this.insurance = [];
    }
    this.insurance.push(insuranceData);
  }

  removeInsurance(insuranceId) {
    if (!this.insurance) return false;
    const initialLength = this.insurance.length;
    this.insurance = this.insurance.filter(
      (insurance) => insurance.id !== insuranceId
    );
    return this.insurance.length < initialLength;
  }

  updateInsurance(insuranceId, insuranceData) {
    if (!this.insurance) return false;

    const index = this.insurance.findIndex(
      (insurance) => insurance.id === insuranceId
    );
    if (index === -1) return false;

    this.insurance[index] = { ...this.insurance[index], ...insuranceData };
    return true;
  }

  getInsuranceById(insuranceId) {
    if (!this.insurance) return null;
    return this.insurance.find((insurance) => insurance.id === insuranceId);
  }

  getTotalInsuranceAmount() {
    if (!this.hasInsurance()) return 0;
    return this.insurance.reduce(
      (total, insurance) => total + (insurance.insuranceAmount || 0),
      0
    );
  }

  getTotalPaidAmount() {
    if (!this.hasInsurance()) return 0;
    return this.insurance.reduce(
      (total, insurance) => total + (insurance.paidAmount || 0),
      0
    );
  }

  getTotalRemainingDebt() {
    if (!this.hasInsurance()) return 0;
    return this.insurance.reduce(
      (total, insurance) => total + (insurance.remainingDebt || 0),
      0
    );
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      plateNumber: this.plateNumber,
      model: this.model,
      type: this.type,
      ownership: this.ownership,
      modelNumber: this.modelNumber,
      licenseExpiry: this.licenseExpiry,
      lastTest: this.lastTest,
      color: this.color,
      price: this.price,
      image: this.image,
      insurance: this.insurance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json) {
    return new Vehicle(json);
  }

  static create(vehicleData) {
    return new Vehicle(vehicleData);
  }
}
