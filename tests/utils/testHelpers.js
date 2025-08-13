import jwt from "jsonwebtoken";
import UserModel from "../../DB/models/user.model.js";
import Customer from "../../DB/models/Customer.model.js";
import Invoice from "../../DB/models/Invoice.model.js";
import Payment from "../../DB/models/Payment.model.js";

// Create test user
export const createTestUser = async (userData = {}) => {
  const defaultUser = {
    name: "Test User",
    email: "islam.mutawea@gmail.com",
    password: "password123",
    role: "Admin",
    department: "IT",
    ...userData,
  };

  const user = new UserModel(defaultUser);
  await user.save();
  return user;
};

// Create test customer
export const createTestCustomer = async (customerData = {}) => {
  const defaultCustomer = {
    first_name: "John",
    last_name: "Doe",
    id_Number: "123456789",
    phone_number: "+1234567890",
    joining_date: new Date(),
    city: "Test City",
    email: "john.doe@example.com",
    vehicles: [],
    ...customerData,
  };

  const customer = new Customer(defaultCustomer);
  await customer.save();
  return customer;
};

// Create test invoice
export const createTestInvoice = async (invoiceData = {}) => {
  const customer = await createTestCustomer();
  const user = await createTestUser();

  const defaultInvoice = {
    customer: customer._id,
    insurancePolicy: new mongoose.Types.ObjectId(),
    vehicle: new mongoose.Types.ObjectId(),
    totalAmount: 1000,
    balanceDue: 1000,
    description: "Test Insurance Invoice",
    createdBy: user._id,
    ...invoiceData,
  };

  const invoice = new Invoice(defaultInvoice);
  await invoice.save();
  return invoice;
};

// Create test payment
export const createTestPayment = async (paymentData = {}) => {
  const invoice = await createTestInvoice();
  const customer = await Customer.findById(invoice.customer);
  const user = await createTestUser();

  const defaultPayment = {
    invoice: invoice._id,
    customer: customer._id,
    paymentMethod: "Cash",
    paymentAmount: 500,
    createdBy: user._id,
    ...paymentData,
  };

  const payment = new Payment(defaultPayment);
  await payment.save();
  return payment;
};

// Generate JWT token for testing
export const generateTestToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Mock request object
export const createMockRequest = (data = {}) => {
  return {
    body: data.body || {},
    params: data.params || {},
    query: data.query || {},
    user: data.user || null,
    file: data.file || null,
    files: data.files || null,
    ...data,
  };
};

// Mock response object
export const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Mock next function
export const createMockNext = () => {
  return jest.fn();
};

// Clean up test data
export const cleanupTestData = async () => {
  await UserModel.deleteMany({});
  await Customer.deleteMany({});
  await Invoice.deleteMany({});
  await Payment.deleteMany({});
};

// Test data constants
export const TEST_DATA = {
  USER: {
    name: "Test User",
    email: "islam.mutawea@gmail.com",
    password: "password123",
    role: "Admin",
    department: "IT",
  },
  CUSTOMER: {
    first_name: "John",
    last_name: "Doe",
    id_Number: "123456789",
    phone_number: "+1234567890",
    joining_date: new Date(),
    city: "Test City",
    email: "john.doe@example.com",
  },
  VEHICLE: {
    plateNumber: "ABC123",
    model: "Toyota Camry",
    type: "Sedan",
    ownership: "Owned",
    modelNumber: "2023",
    licenseExpiry: new Date("2025-12-31"),
    lastTest: new Date("2024-12-31"),
    color: "White",
    price: 25000,
  },
  INSURANCE: {
    insuranceStartDate: new Date(),
    insuranceEndDate: new Date("2025-12-31"),
    insuranceType: "Comprehensive",
    insuranceCompany: "Test Insurance Co",
    agent: "Test Agent",
    paymentMethod: "Cash",
    insuranceAmount: 1000,
    paidAmount: 0,
    isUnder24: false,
  },
};
