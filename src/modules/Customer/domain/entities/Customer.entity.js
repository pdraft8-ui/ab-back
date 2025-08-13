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
    if (this.vehicles) {
      this.vehicles = this.vehicles.filter(
        (vehicle) => vehicle.id !== vehicleId
      );
    }
  }

  addInsurance(insurance) {
    if (!this.insurances) this.insurances = [];
    this.insurances.push(insurance);
  }

  removeInsurance(insuranceId) {
    if (this.insurances) {
      this.insurances = this.insurances.filter(
        (insurance) => insurance.id !== insuranceId
      );
    }
  }

  updateVehicle(vehicleId, updatedVehicle) {
    if (this.vehicles) {
      const index = this.vehicles.findIndex(
        (vehicle) => vehicle.id === vehicleId
      );
      if (index !== -1) {
        this.vehicles[index] = { ...this.vehicles[index], ...updatedVehicle };
      }
    }
  }

  updateInsurance(insuranceId, updatedInsurance) {
    if (this.insurances) {
      const index = this.insurances.findIndex(
        (insurance) => insurance.id === insuranceId
      );
      if (index !== -1) {
        this.insurances[index] = {
          ...this.insurances[index],
          ...updatedInsurance,
        };
      }
    }
  }

  validateCustomerData() {
    const errors = [];

    if (!this.first_name || this.first_name.trim().length === 0) {
      errors.push("First name is required");
    }

    if (!this.last_name || this.last_name.trim().length === 0) {
      errors.push("Last name is required");
    }

    if (!this.id_Number || this.id_Number.trim().length === 0) {
      errors.push("ID number is required");
    }

    if (!this.phone_number || this.phone_number.trim().length === 0) {
      errors.push("Phone number is required");
    }

    if (this.email && !this.isValidEmail(this.email)) {
      errors.push("Invalid email format");
    }

    if (this.birth_date) {
      const birthDate = new Date(this.birth_date);
      const today = new Date();
      if (birthDate > today) {
        errors.push("Birth date cannot be in the future");
      }
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

  static fromJSON(data) {
    return new Customer({
      id: data.id,
      image: data.image,
      first_name: data.first_name,
      last_name: data.last_name,
      id_Number: data.id_Number,
      phone_number: data.phone_number,
      joining_date: data.joining_date,
      notes: data.notes,
      city: data.city,
      email: data.email,
      birth_date: data.birth_date,
      agentsId: data.agentsId,
      agentsName: data.agentsName,
      vehicles: data.vehicles,
      insurances: data.insurances,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
