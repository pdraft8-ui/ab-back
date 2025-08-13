export class Agent {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validation methods
  isValid() {
    const errors = [];

    if (!this.name || this.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (this.name && this.name.trim().length > 50) {
      errors.push("Name cannot exceed 50 characters");
    }

    if (!this.email) {
      errors.push("Email is required");
    } else if (!this.isValidEmail(this.email)) {
      errors.push("Invalid email format");
    }

    if (!this.phone) {
      errors.push("Phone number is required");
    } else if (!this.isValidPhone(this.phone)) {
      errors.push("Invalid phone number format");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.length >= 8;
  }

  // Business methods
  updateInfo(updateData) {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.email !== undefined) {
      this.email = updateData.email.toLowerCase();
    }
    if (updateData.phone !== undefined) {
      this.phone = updateData.phone;
    }
    this.updatedAt = new Date();
  }

  // Getters
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPhone() {
    return this.phone;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  // Data transformation
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Static factory method
  static create(data) {
    return new Agent(data);
  }

  static fromMongoDoc(mongoDoc) {
    return new Agent({
      id: mongoDoc._id ? mongoDoc._id.toString() : mongoDoc.id,
      name: mongoDoc.name,
      email: mongoDoc.email,
      phone: mongoDoc.phone,
      createdAt: mongoDoc.createdAt,
      updatedAt: mongoDoc.updatedAt,
    });
  }
}
