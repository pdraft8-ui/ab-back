export class Call {
  constructor(data) {
    this.id = data.id || data._id;
    this.callid = data.callid;
    this.recordingUrl = data.recordingUrl;
    this.customerId = data.customerId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  isValid() {
    return !!(
      this.callid &&
      this.recordingUrl &&
      this.customerId &&
      this.isValidCallId(this.callid) &&
      this.isValidRecordingUrl(this.recordingUrl)
    );
  }

  isValidCallId(callid) {
    return typeof callid === "string" && callid.trim().length > 0;
  }

  isValidRecordingUrl(recordingUrl) {
    return typeof recordingUrl === "string" && recordingUrl.trim().length > 0;
  }

  getCallId() {
    return this.callid;
  }

  getRecordingUrl() {
    return this.recordingUrl;
  }

  getCustomerId() {
    return this.customerId;
  }

  updateRecordingUrl(recordingUrl) {
    if (this.isValidRecordingUrl(recordingUrl)) {
      this.recordingUrl = recordingUrl;
      this.updatedAt = new Date();
    }
    return this;
  }

  hasRecording() {
    return !!this.recordingUrl;
  }

  toJSON() {
    return {
      id: this.id,
      callid: this.callid,
      recordingUrl: this.recordingUrl,
      customerId: this.customerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(data) {
    return new Call(data);
  }

  static create(data) {
    return new Call(data);
  }
}
