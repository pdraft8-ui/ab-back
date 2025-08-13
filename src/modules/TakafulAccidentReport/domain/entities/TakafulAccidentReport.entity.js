export class TakafulAccidentReport {
  constructor(data) {
    this.id = data.id || data._id;
    this.customerId = data.customerId;
    this.accidentInfo = data.accidentInfo;
    this.policyInfo = data.policyInfo;
    this.customerPerson = data.customerPerson;
    this.driverInfo = data.driverInfo;
    this.licenseInfo = data.licenseInfo;
    this.customerVehicle = data.customerVehicle;
    this.otherVehicles = data.otherVehicles || [];
    this.policeAndWitnesses = data.policeAndWitnesses;
    this.passengers = data.passengers || [];
    this.accidentNarration = data.accidentNarration;
    this.notifierSignature = data.notifierSignature;
    this.receiverName = data.receiverName;
    this.receiverNotes = data.receiverNotes;
    this.declaration = data.declaration;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  isValid() {
    return !!(
      this.customerId &&
      this.isValidAccidentInfo() &&
      this.isValidPolicyInfo() &&
      this.isValidCustomerPerson() &&
      this.isValidDriverInfo() &&
      this.isValidCustomerVehicle() &&
      this.isValidPoliceAndWitnesses() &&
      this.accidentNarration &&
      this.notifierSignature &&
      this.receiverName &&
      this.receiverNotes &&
      this.isValidDeclaration()
    );
  }

  isValidAccidentInfo() {
    return !!(
      this.accidentInfo?.reportDate &&
      this.accidentInfo?.accidentDate &&
      this.accidentInfo?.accidentType &&
      this.accidentInfo?.accidentLocation &&
      this.accidentInfo?.accidentTime &&
      this.accidentInfo?.passengersCount &&
      this.accidentInfo?.agentName
    );
  }

  isValidPolicyInfo() {
    return !!(
      this.policyInfo?.policyNumber &&
      this.policyInfo?.branch &&
      this.policyInfo?.durationFrom &&
      this.policyInfo?.durationTo &&
      this.policyInfo?.issueDate &&
      this.policyInfo?.isFullCoverage !== undefined &&
      this.policyInfo?.fullCoverageFee &&
      this.policyInfo?.isThirdParty !== undefined &&
      this.policyInfo?.thirdPartyFee &&
      this.policyInfo?.isMandatory !== undefined &&
      this.policyInfo?.maxAllowedPassengers
    );
  }

  isValidCustomerPerson() {
    return !!(
      this.customerPerson?.name &&
      this.customerPerson?.address &&
      this.customerPerson?.residence &&
      this.customerPerson?.workAddress &&
      this.customerPerson?.workPhone
    );
  }

  isValidDriverInfo() {
    return !!(
      this.driverInfo?.name &&
      this.driverInfo?.idNumber &&
      this.driverInfo?.licenseNumber &&
      this.driverInfo?.licenseType &&
      this.driverInfo?.licenseExpiry &&
      this.driverInfo?.phoneNumber &&
      this.driverInfo?.relationToCustomer
    );
  }

  isValidCustomerVehicle() {
    return !!(
      this.customerVehicle?.plateNumber &&
      this.customerVehicle?.model &&
      this.customerVehicle?.type &&
      this.customerVehicle?.manufactureYear &&
      this.customerVehicle?.chassisNumber &&
      this.customerVehicle?.engineNumber &&
      this.customerVehicle?.insuranceCompany &&
      this.customerVehicle?.policyNumber &&
      this.customerVehicle?.insuranceType &&
      this.isValidDamage()
    );
  }

  isValidDamage() {
    return !!(
      this.customerVehicle?.damage?.front &&
      this.customerVehicle?.damage?.back &&
      this.customerVehicle?.damage?.left &&
      this.customerVehicle?.damage?.right &&
      this.customerVehicle?.damage?.estimatedValue &&
      this.customerVehicle?.damage?.towingCompany &&
      this.customerVehicle?.damage?.garage
    );
  }

  isValidPoliceAndWitnesses() {
    return !!(
      this.policeAndWitnesses?.reportedDate &&
      this.policeAndWitnesses?.policeAuthority &&
      this.policeAndWitnesses?.sketchDrawn !== undefined &&
      this.policeAndWitnesses?.policeCame !== undefined &&
      this.policeAndWitnesses?.witnesses &&
      Array.isArray(this.policeAndWitnesses.witnesses)
    );
  }

  isValidDeclaration() {
    return !!(
      this.declaration?.declarerName &&
      this.declaration?.declarationDate &&
      this.declaration?.documentCheckerName &&
      this.declaration?.checkerJob &&
      this.declaration?.checkerSignature &&
      this.declaration?.checkerDate
    );
  }

  getCustomerId() {
    return this.customerId;
  }

  getAccidentInfo() {
    return this.accidentInfo;
  }

  getPolicyInfo() {
    return this.policyInfo;
  }

  getCustomerPerson() {
    return this.customerPerson;
  }

  getDriverInfo() {
    return this.driverInfo;
  }

  getCustomerVehicle() {
    return this.customerVehicle;
  }

  getOtherVehicles() {
    return this.otherVehicles;
  }

  getPoliceAndWitnesses() {
    return this.policeAndWitnesses;
  }

  getPassengers() {
    return this.passengers;
  }

  getAccidentNarration() {
    return this.accidentNarration;
  }

  getDeclaration() {
    return this.declaration;
  }

  updateAccidentReport(data) {
    if (data.accidentInfo)
      this.accidentInfo = { ...this.accidentInfo, ...data.accidentInfo };
    if (data.policyInfo)
      this.policyInfo = { ...this.policyInfo, ...data.policyInfo };
    if (data.customerPerson)
      this.customerPerson = { ...this.customerPerson, ...data.customerPerson };
    if (data.driverInfo)
      this.driverInfo = { ...this.driverInfo, ...data.driverInfo };
    if (data.customerVehicle)
      this.customerVehicle = {
        ...this.customerVehicle,
        ...data.customerVehicle,
      };
    if (data.otherVehicles) this.otherVehicles = data.otherVehicles;
    if (data.policeAndWitnesses)
      this.policeAndWitnesses = {
        ...this.policeAndWitnesses,
        ...data.policeAndWitnesses,
      };
    if (data.passengers) this.passengers = data.passengers;
    if (data.accidentNarration) this.accidentNarration = data.accidentNarration;
    if (data.notifierSignature) this.notifierSignature = data.notifierSignature;
    if (data.receiverName) this.receiverName = data.receiverName;
    if (data.receiverNotes) this.receiverNotes = data.receiverNotes;
    if (data.declaration)
      this.declaration = { ...this.declaration, ...data.declaration };
    this.updatedAt = new Date();
    return this;
  }

  hasWitnesses() {
    return this.policeAndWitnesses?.witnesses?.length > 0;
  }

  hasPassengers() {
    return this.passengers?.length > 0;
  }

  hasOtherVehicles() {
    return this.otherVehicles?.length > 0;
  }

  isPoliceReported() {
    return this.policeAndWitnesses?.policeCame === true;
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      accidentInfo: this.accidentInfo,
      policyInfo: this.policyInfo,
      customerPerson: this.customerPerson,
      driverInfo: this.driverInfo,
      licenseInfo: this.licenseInfo,
      customerVehicle: this.customerVehicle,
      otherVehicles: this.otherVehicles,
      policeAndWitnesses: this.policeAndWitnesses,
      passengers: this.passengers,
      accidentNarration: this.accidentNarration,
      notifierSignature: this.notifierSignature,
      receiverName: this.receiverName,
      receiverNotes: this.receiverNotes,
      declaration: this.declaration,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data) {
    return new TakafulAccidentReport(data);
  }

  static create(data) {
    return new TakafulAccidentReport(data);
  }
}
