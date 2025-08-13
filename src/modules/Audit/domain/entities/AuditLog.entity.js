export class AuditLog {
  constructor(auditData) {
    this.id = auditData.id || null;
    this.user = auditData.user || null;
    this.action = auditData.action || "";
    this.entity = auditData.entity || "";
    this.entityId = auditData.entityId || null;
    this.oldValue = auditData.oldValue || null;
    this.newValue = auditData.newValue || null;
    this.userName = auditData.userName || "";
    this.createdAt = auditData.createdAt || new Date();
    this.updatedAt = auditData.updatedAt || new Date();
  }

  // Business logic methods
  isValid() {
    return !!(this.action && this.entity && this.user);
  }

  getActionDescription() {
    return `${this.action} on ${this.entity}${
      this.entityId ? ` (ID: ${this.entityId})` : ""
    }`;
  }

  hasChanges() {
    return this.oldValue !== null || this.newValue !== null;
  }

  getChangeSummary() {
    if (!this.hasChanges()) {
      return "No changes recorded";
    }

    if (this.oldValue && this.newValue) {
      return "Updated";
    } else if (this.newValue && !this.oldValue) {
      return "Created";
    } else if (this.oldValue && !this.newValue) {
      return "Deleted";
    }

    return "Modified";
  }

  toJSON() {
    return {
      id: this.id,
      user: this.user,
      action: this.action,
      entity: this.entity,
      entityId: this.entityId,
      oldValue: this.oldValue,
      newValue: this.newValue,
      userName: this.userName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromJSON(json) {
    return new AuditLog(json);
  }
}
