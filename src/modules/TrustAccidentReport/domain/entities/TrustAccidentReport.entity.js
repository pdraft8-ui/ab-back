export class TrustAccidentReport {
  constructor(data) {
    this.id = data.id || null;
    this.customerId = data.customerId || null;

    // Accident Details
    this.accidentDetails = {
      location: data.accidentDetails?.location || "",
      date: data.accidentDetails?.date || null,
      time: data.accidentDetails?.time || "",
      accidentType: data.accidentDetails?.accidentType || "",
      reportDate: data.accidentDetails?.reportDate || null,
    };

    // Customer Vehicle
    this.customerVehicle = {
      plateNumber: data.customerVehicle?.plateNumber || "",
      type: data.customerVehicle?.type || "",
      model: data.customerVehicle?.model || "",
      color: data.customerVehicle?.color || "",
      ownership: data.customerVehicle?.ownership || "",
      usage: data.customerVehicle?.usage || "",
      manufactureYear: data.customerVehicle?.manufactureYear || "",
      chassisNumber: data.customerVehicle?.chassisNumber || "",
      testExpiry: data.customerVehicle?.testExpiry || null,
      insuranceCompany: data.customerVehicle?.insuranceCompany || "",
      policyNumber: data.customerVehicle?.policyNumber || "",
      insuranceType: data.customerVehicle?.insuranceType || "",
      insurancePeriod: {
        from: data.customerVehicle?.insurancePeriod?.from || null,
        to: data.customerVehicle?.insurancePeriod?.to || null,
      },
    };

    // Driver Details
    this.driverDetails = {
      name: data.driverDetails?.name || "",
      birthDate: data.driverDetails?.birthDate || null,
      address: data.driverDetails?.address || "",
      licenseNumber: data.driverDetails?.licenseNumber || "",
      licenseType: data.driverDetails?.licenseType || "",
      licenseExpiry: data.driverDetails?.licenseExpiry || null,
      relationToCustomer: data.driverDetails?.relationToCustomer || "",
    };

    // Damages
    this.damages = {
      front: data.damages?.front || "",
      back: data.damages?.back || "",
      right: data.damages?.right || "",
      left: data.damages?.left || "",
      estimatedCost: data.damages?.estimatedCost || "",
      garageName: data.damages?.garageName || "",
      towCompany: data.damages?.towCompany || "",
    };

    // Other Vehicle
    this.otherVehicle = {
      plateNumber: data.otherVehicle?.plateNumber || "",
      type: data.otherVehicle?.type || "",
      model: data.otherVehicle?.model || "",
      color: data.otherVehicle?.color || "",
      insuranceCompany: data.otherVehicle?.insuranceCompany || "",
      driverName: data.otherVehicle?.driverName || "",
      driverAddress: data.otherVehicle?.driverAddress || "",
      licenseNumber: data.otherVehicle?.licenseNumber || "",
      damageDescription: data.otherVehicle?.damageDescription || "",
    };

    // Witnesses
    this.witnesses = data.witnesses || [];

    // Police Report
    this.policeReport = {
      reportDate: data.policeReport?.reportDate || null,
      authority: data.policeReport?.authority || "",
      sketchDrawn: data.policeReport?.sketchDrawn || false,
      officersPresent: data.policeReport?.officersPresent || false,
    };

    this.narration = data.narration || "";
    this.signature = data.signature || "";

    // Declaration
    this.declaration = {
      declarerName: data.declaration?.declarerName || "",
      declarationDate: data.declaration?.declarationDate || null,
      reviewerName: data.declaration?.reviewerName || "",
      reviewerSignature: data.declaration?.reviewerSignature || "",
      reviewDate: data.declaration?.reviewDate || null,
    };

    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  isValid() {
    return (
      this.isValidCustomerId() &&
      this.isValidAccidentDetails() &&
      this.isValidCustomerVehicle() &&
      this.isValidDriverDetails() &&
      this.isValidDamages() &&
      this.isValidOtherVehicle() &&
      this.isValidWitnesses() &&
      this.isValidPoliceReport() &&
      this.isValidNarration() &&
      this.isValidSignature() &&
      this.isValidDeclaration()
    );
  }

  isValidCustomerId() {
    return this.customerId && typeof this.customerId === "string";
  }

  isValidAccidentDetails() {
    return (
      this.accidentDetails.location &&
      this.accidentDetails.date &&
      this.accidentDetails.time &&
      this.accidentDetails.accidentType &&
      this.accidentDetails.reportDate
    );
  }

  isValidCustomerVehicle() {
    return (
      this.customerVehicle.plateNumber &&
      this.customerVehicle.type &&
      this.customerVehicle.model &&
      this.customerVehicle.color &&
      this.customerVehicle.ownership &&
      this.customerVehicle.usage &&
      this.customerVehicle.manufactureYear &&
      this.customerVehicle.chassisNumber &&
      this.customerVehicle.testExpiry &&
      this.customerVehicle.insuranceCompany &&
      this.customerVehicle.policyNumber &&
      this.customerVehicle.insuranceType &&
      this.customerVehicle.insurancePeriod.from &&
      this.customerVehicle.insurancePeriod.to
    );
  }

  isValidDriverDetails() {
    return (
      this.driverDetails.name &&
      this.driverDetails.birthDate &&
      this.driverDetails.address &&
      this.driverDetails.licenseNumber &&
      this.driverDetails.licenseType &&
      this.driverDetails.licenseExpiry &&
      this.driverDetails.relationToCustomer
    );
  }

  isValidDamages() {
    return (
      this.damages.front &&
      this.damages.back &&
      this.damages.right &&
      this.damages.left &&
      this.damages.estimatedCost &&
      this.damages.garageName &&
      this.damages.towCompany
    );
  }

  isValidOtherVehicle() {
    return (
      this.otherVehicle.plateNumber &&
      this.otherVehicle.type &&
      this.otherVehicle.model &&
      this.otherVehicle.color &&
      this.otherVehicle.insuranceCompany &&
      this.otherVehicle.driverName &&
      this.otherVehicle.driverAddress &&
      this.otherVehicle.licenseNumber &&
      this.otherVehicle.damageDescription
    );
  }

  isValidWitnesses() {
    return (
      Array.isArray(this.witnesses) &&
      this.witnesses.every(
        (witness) => witness.name && witness.address && witness.phone
      )
    );
  }

  isValidPoliceReport() {
    return (
      this.policeReport.reportDate &&
      this.policeReport.authority &&
      typeof this.policeReport.sketchDrawn === "boolean" &&
      typeof this.policeReport.officersPresent === "boolean"
    );
  }

  isValidNarration() {
    return this.narration && this.narration.trim().length > 0;
  }

  isValidSignature() {
    return this.signature && this.signature.trim().length > 0;
  }

  isValidDeclaration() {
    return (
      this.declaration.declarerName &&
      this.declaration.declarationDate &&
      this.declaration.reviewerName &&
      this.declaration.reviewerSignature &&
      this.declaration.reviewDate
    );
  }

  // Getters
  getCustomerId() {
    return this.customerId;
  }

  getAccidentDetails() {
    return this.accidentDetails;
  }

  getCustomerVehicle() {
    return this.customerVehicle;
  }

  getDriverDetails() {
    return this.driverDetails;
  }

  getDamages() {
    return this.damages;
  }

  getOtherVehicle() {
    return this.otherVehicle;
  }

  getWitnesses() {
    return this.witnesses;
  }

  getPoliceReport() {
    return this.policeReport;
  }

  getNarration() {
    return this.narration;
  }

  getSignature() {
    return this.signature;
  }

  getDeclaration() {
    return this.declaration;
  }

  // Update method
  updateAccidentReport(updateData) {
    if (updateData.accidentDetails) {
      this.accidentDetails = {
        ...this.accidentDetails,
        ...updateData.accidentDetails,
      };
    }
    if (updateData.customerVehicle) {
      this.customerVehicle = {
        ...this.customerVehicle,
        ...updateData.customerVehicle,
      };
    }
    if (updateData.driverDetails) {
      this.driverDetails = {
        ...this.driverDetails,
        ...updateData.driverDetails,
      };
    }
    if (updateData.damages) {
      this.damages = { ...this.damages, ...updateData.damages };
    }
    if (updateData.otherVehicle) {
      this.otherVehicle = { ...this.otherVehicle, ...updateData.otherVehicle };
    }
    if (updateData.witnesses) {
      this.witnesses = updateData.witnesses;
    }
    if (updateData.policeReport) {
      this.policeReport = { ...this.policeReport, ...updateData.policeReport };
    }
    if (updateData.narration) {
      this.narration = updateData.narration;
    }
    if (updateData.signature) {
      this.signature = updateData.signature;
    }
    if (updateData.declaration) {
      this.declaration = { ...this.declaration, ...updateData.declaration };
    }
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      accidentDetails: this.accidentDetails,
      customerVehicle: this.customerVehicle,
      driverDetails: this.driverDetails,
      damages: this.damages,
      otherVehicle: this.otherVehicle,
      witnesses: this.witnesses,
      policeReport: this.policeReport,
      narration: this.narration,
      signature: this.signature,
      declaration: this.declaration,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json) {
    return new TrustAccidentReport(json);
  }

  static create(data) {
    return new TrustAccidentReport(data);
  }
}
