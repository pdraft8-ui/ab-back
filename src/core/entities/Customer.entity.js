export class Customer {
  constructor({
    id,
    image,
    first_name,
    last_name,
    id_Number,
    phone_number,
    joining_date,
    notes,
    city,
    email,
    birth_date,
    agentsId,
    agentsName,
    vehicles,
    insurances,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.image = image;
    this.first_name = first_name;
    this.last_name = last_name;
    this.id_Number = id_Number;
    this.phone_number = phone_number;
    this.joining_date = joining_date;
    this.notes = notes;
    this.city = city;
    this.email = email;
    this.birth_date = birth_date;
    this.agentsId = agentsId;
    this.agentsName = agentsName;
    this.vehicles = vehicles || [];
    this.insurances = insurances || [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Business logic methods
  getFullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  getAge() {
    if (!this.birth_date) return null;
    const today = new Date();
    const birthDate = new Date(this.birth_date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  getCustomerSince() {
    if (!this.joining_date) return null;
    const today = new Date();
    const joinDate = new Date(this.joining_date);
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  hasVehicles() {
    return this.vehicles && this.vehicles.length > 0;
  }

  hasInsurances() {
    return this.insurances && this.insurances.length > 0;
  }

  getVehicleCount() {
    return this.vehicles ? this.vehicles.length : 0;
  }

  getInsuranceCount() {
    return this.insurances ? this.insurances.length : 0;
  }

  getVehicleByPlateNumber(plateNumber) {
    return this.vehicles.find((vehicle) => vehicle.plateNumber === plateNumber);
  }

  getInsuranceByPolicyNumber(policyNumber) {
    return this.insurances.find(
      (insurance) => insurance.policyNumber === policyNumber
    );
  }

  addVehicle(vehicle) {
    if (!this.vehicles) this.vehicles = [];
    this.vehicles.push(vehicle);
  }

  removeVehicle(vehicleId) {
    if (!this.vehicles) return false;
    const index = this.vehicles.findIndex(
      (v) => v._id?.toString() === vehicleId?.toString()
    );
    if (index > -1) {
      this.vehicles.splice(index, 1);
      return true;
    }
    return false;
  }

  addInsurance(insurance) {
    if (!this.insurances) this.insurances = [];
    this.insurances.push(insurance);
  }

  removeInsurance(insuranceId) {
    if (!this.insurances) return false;
    const index = this.insurances.findIndex(
      (i) => i._id?.toString() === insuranceId?.toString()
    );
    if (index > -1) {
      this.insurances.splice(index, 1);
      return true;
    }
    return false;
  }

  updateVehicle(vehicleId, updatedVehicle) {
    if (!this.vehicles) return false;
    const index = this.vehicles.findIndex(
      (v) => v._id?.toString() === vehicleId?.toString()
    );
    if (index > -1) {
      this.vehicles[index] = { ...this.vehicles[index], ...updatedVehicle };
      return true;
    }
    return false;
  }

  updateInsurance(insuranceId, updatedInsurance) {
    if (!this.insurances) return false;
    const index = this.insurances.findIndex(
      (i) => i._id?.toString() === insuranceId?.toString()
    );
    if (index > -1) {
      this.insurances[index] = {
        ...this.insurances[index],
        ...updatedInsurance,
      };
      return true;
    }
    return false;
  }

  validateCustomerData() {
    const errors = [];

    if (!this.first_name || this.first_name.trim().length === 0) {
      errors.push("First name is required");
    }

    if (!this.last_name || this.last_name.trim().length === 0) {
      errors.push("Last name is required");
    }

    if (!this.id_Number) {
      errors.push("ID number is required");
    }

    if (!this.phone_number || this.phone_number.trim().length === 0) {
      errors.push("Phone number is required");
    }

    if (!this.city || this.city.trim().length === 0) {
      errors.push("City is required");
    }

    if (!this.birth_date) {
      errors.push("Birth date is required");
    }

    if (this.email && !this.isValidEmail(this.email)) {
      errors.push("Invalid email format");
    }

    return errors;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toJSON() {
    return {
      id: this.id,
      image: this.image,
      first_name: this.first_name,
      last_name: this.last_name,
      id_Number: this.id_Number,
      phone_number: this.phone_number,
      joining_date: this.joining_date,
      notes: this.notes,
      city: this.city,
      email: this.email,
      birth_date: this.birth_date,
      agentsId: this.agentsId,
      agentsName: this.agentsName,
      vehicles: this.vehicles,
      insurances: this.insurances,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
