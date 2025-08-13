/**
 * Database Indexes Script
 * Adds performance-optimizing indexes to MongoDB collections
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Import models
import PaymentModel from "../../DB/models/payment.model.js";
import InvoiceModel from "../../DB/models/invoice.model.js";
import CustomerModel from "../../DB/models/customer.model.js";
import ChequeModel from "../../DB/models/Cheque.model.js";
import UserModel from "../../DB/models/user.model.js";
import VehicleModel from "../../DB/models/vehicle.model.js";

/**
 * Add indexes to Payment collection
 */
async function addPaymentIndexes() {
  try {
    console.log("Adding Payment indexes...");

    // Compound indexes for common queries
    await PaymentModel.collection.createIndex(
      { customer: 1, paymentDate: -1 },
      { name: "payment_customer_date" }
    );

    await PaymentModel.collection.createIndex(
      { invoice: 1, status: 1 },
      { name: "payment_invoice_status" }
    );

    await PaymentModel.collection.createIndex(
      { status: 1, paymentDate: -1 },
      { name: "payment_status_date" }
    );

    await PaymentModel.collection.createIndex(
      { paymentMethod: 1, paymentDate: -1 },
      { name: "payment_method_date" }
    );

    // Text search index
    await PaymentModel.collection.createIndex(
      { notes: "text", referenceNumber: "text" },
      { name: "payment_text_search" }
    );

    console.log("✅ Payment indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding Payment indexes:", error.message);
  }
}

/**
 * Add indexes to Invoice collection
 */
async function addInvoiceIndexes() {
  try {
    console.log("Adding Invoice indexes...");

    // Compound indexes for common queries
    await InvoiceModel.collection.createIndex(
      { customer: 1, status: 1 },
      { name: "invoice_customer_status" }
    );

    await InvoiceModel.collection.createIndex(
      { dueDate: 1, status: 1 },
      { name: "invoice_due_status" }
    );

    await InvoiceModel.collection.createIndex(
      { status: 1, invoiceDate: -1 },
      { name: "invoice_status_date" }
    );

    await InvoiceModel.collection.createIndex(
      { totalAmount: 1, balanceDue: 1 },
      { name: "invoice_amount_balance" }
    );

    // Text search index
    await InvoiceModel.collection.createIndex(
      { description: "text", notes: "text" },
      { name: "invoice_text_search" }
    );

    // Overdue invoices index
    await InvoiceModel.collection.createIndex(
      { dueDate: 1, status: 1, balanceDue: 1 },
      { name: "invoice_overdue" }
    );

    console.log("✅ Invoice indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding Invoice indexes:", error.message);
  }
}

/**
 * Add indexes to Customer collection
 */
async function addCustomerIndexes() {
  try {
    console.log("Adding Customer indexes...");

    // Compound indexes for common queries
    await CustomerModel.collection.createIndex(
      { name: 1, email: 1 },
      { name: "customer_name_email" }
    );

    await CustomerModel.collection.createIndex(
      { phone: 1, email: 1 },
      { name: "customer_phone_email" }
    );

    await CustomerModel.collection.createIndex(
      { createdAt: -1, status: 1 },
      { name: "customer_created_status" }
    );

    // Text search index
    await CustomerModel.collection.createIndex(
      { name: "text", email: "text", phone: "text", address: "text" },
      { name: "customer_text_search" }
    );

    // Vehicle insurance indexes
    await CustomerModel.collection.createIndex(
      { "vehicles.insurance.insuranceEndDate": 1 },
      { name: "customer_vehicle_insurance_end" }
    );

    await CustomerModel.collection.createIndex(
      { "vehicles.insurance.insuranceCompany": 1 },
      { name: "customer_vehicle_insurance_company" }
    );

    console.log("✅ Customer indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding Customer indexes:", error.message);
  }
}

/**
 * Add indexes to Cheque collection
 */
async function addChequeIndexes() {
  try {
    console.log("Adding Cheque indexes...");

    // Compound indexes for common queries
    await ChequeModel.collection.createIndex(
      { customer: 1, chequeStatus: 1 },
      { name: "cheque_customer_status" }
    );

    await ChequeModel.collection.createIndex(
      { chequeDate: 1, chequeStatus: 1 },
      { name: "cheque_date_status" }
    );

    await ChequeModel.collection.createIndex(
      { bankName: 1, chequeStatus: 1 },
      { name: "cheque_bank_status" }
    );

    await ChequeModel.collection.createIndex(
      { chequeAmount: 1, chequeStatus: 1 },
      { name: "cheque_amount_status" }
    );

    // Text search index
    await ChequeModel.collection.createIndex(
      { customerName: "text", bankName: "text", notes: "text" },
      { name: "cheque_text_search" }
    );

    // Overdue cheques index
    await ChequeModel.collection.createIndex(
      { chequeDate: 1, chequeStatus: 1 },
      { name: "cheque_overdue" }
    );

    console.log("✅ Cheque indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding Cheque indexes:", error.message);
  }
}

/**
 * Add indexes to User collection
 */
async function addUserIndexes() {
  try {
    console.log("Adding User indexes...");

    // Compound indexes for common queries
    await UserModel.collection.createIndex(
      { email: 1, status: 1 },
      { name: "user_email_status" }
    );

    await UserModel.collection.createIndex(
      { role: 1, status: 1 },
      { name: "user_role_status" }
    );

    await UserModel.collection.createIndex(
      { createdAt: -1, status: 1 },
      { name: "user_created_status" }
    );

    // Text search index
    await UserModel.collection.createIndex(
      { name: "text", email: "text" },
      { name: "user_text_search" }
    );

    console.log("✅ User indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding User indexes:", error.message);
  }
}

/**
 * Add indexes to Vehicle collection
 */
async function addVehicleIndexes() {
  try {
    console.log("Adding Vehicle indexes...");

    // Compound indexes for common queries
    await VehicleModel.collection.createIndex(
      { plateNumber: 1, model: 1 },
      { name: "vehicle_plate_model" }
    );

    await VehicleModel.collection.createIndex(
      { customer: 1, plateNumber: 1 },
      { name: "vehicle_customer_plate" }
    );

    await VehicleModel.collection.createIndex(
      { "insurance.insuranceEndDate": 1 },
      { name: "vehicle_insurance_end" }
    );

    await VehicleModel.collection.createIndex(
      { "insurance.insuranceCompany": 1 },
      { name: "vehicle_insurance_company" }
    );

    // Text search index
    await VehicleModel.collection.createIndex(
      { plateNumber: "text", model: "text", type: "text" },
      { name: "vehicle_text_search" }
    );

    console.log("✅ Vehicle indexes added successfully");
  } catch (error) {
    console.error("❌ Error adding Vehicle indexes:", error.message);
  }
}

/**
 * Get index statistics
 */
async function getIndexStats() {
  try {
    console.log("\n📊 Index Statistics:");

    const collections = [
      { name: "Payment", model: PaymentModel },
      { name: "Invoice", model: InvoiceModel },
      { name: "Customer", model: CustomerModel },
      { name: "Cheque", model: ChequeModel },
      { name: "User", model: UserModel },
      { name: "Vehicle", model: VehicleModel },
    ];

    for (const collection of collections) {
      const indexes = await collection.model.collection.indexes();
      console.log(`${collection.name}: ${indexes.length} indexes`);
    }
  } catch (error) {
    console.error("❌ Error getting index stats:", error.message);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("🚀 Starting database index optimization...\n");

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB\n");

    // Add indexes to all collections
    await addPaymentIndexes();
    await addInvoiceIndexes();
    await addCustomerIndexes();
    await addChequeIndexes();
    await addUserIndexes();
    await addVehicleIndexes();

    // Get statistics
    await getIndexStats();

    console.log("\n✅ Database index optimization completed successfully!");
  } catch (error) {
    console.error("❌ Error during index optimization:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
