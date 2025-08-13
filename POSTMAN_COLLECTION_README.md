# AB Insurance API Collection - Postman Documentation

This document provides comprehensive documentation for the AB Insurance API Collection, including all available endpoints, authentication methods, and usage examples.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Authentication](#authentication)
3. [Available Endpoints](#available-endpoints)
4. [Request Examples](#request-examples)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

## Setup Instructions

### 1. Import the Collection

1. Open Postman
2. Click "Import" button
3. Select the `AB_Insurance_API_Collection.json` file
4. The collection will be imported with all endpoints organized by category

### 2. Set Up Environment Variables

1. Create a new environment in Postman
2. Add the following variables:
   - `baseUrl`: `http://localhost:3002`
   - `authToken`: (leave empty initially)

### 3. Authentication Setup

1. Run the "Sign In" request first
2. The auth token will be automatically saved to the environment
3. All subsequent requests will use the saved token

## Authentication

### Sign In

- **Endpoint**: `POST /api/v1/user/signin`
- **Body**:
  ```json
  {
    "email": "islam@ab.com",
    "password": "Islam123.."
  }
  ```
- **Response**: Returns JWT token for authentication

### Token Format

- **Header**: `Authorization: Bearer <token>`
- **Auto-save**: Token is automatically saved after successful sign-in

## Available Endpoints

### 1. Authentication

- **Sign In**: `POST /api/v1/user/signin`
- **Sign Up**: `POST /api/v1/user/signup`
- **Forget Password**: `POST /api/v1/user/forgetPassword`
- **Verify Code**: `POST /api/v1/user/verifyCode`
- **Reset Password**: `POST /api/v1/user/resetPassword`

### 2. Statistics Management

- **Get Dashboard Statistics**: `GET /api/v1/statistics/dashboard`
- **Get Total Customers**: `GET /api/v1/statistics/customers`
- **Get Total Income**: `GET /api/v1/statistics/income`
- **Get Total Expenses**: `GET /api/v1/statistics/expenses`
- **Get Due Amount**: `GET /api/v1/statistics/due-amount`
- **Get Payment Methods**: `GET /api/v1/statistics/payment-methods`
- **Get Total Profit**: `GET /api/v1/statistics/profit`
- **Get Payment Overview**: `GET /api/v1/statistics/payment-overview?period=monthly|yearly`
- **Clear Statistics Cache**: `POST /api/v1/statistics/clear-cache` (admin only)

### 3. Reports Management

- **Get Cheque Report**: `GET /api/v1/reports/cheques` (with date, status, pagination filters)
- **Get Due Amounts Report**: `GET /api/v1/reports/due-amounts` (with date, status, pagination filters)
- **Get Agent Customers Report**: `GET /api/v1/reports/agent-customers` (customers with agents, with filters)
- **Get Agent Insurances Report**: `GET /api/v1/reports/agent-insurances` (insurances with agents, with type filters)
- **Get Expired Insurance Report**: `GET /api/v1/reports/expired-insurances` (expired/soon to expire insurances)
- **Clear Reports Cache**: `POST /api/v1/reports/clear-cache` (admin only)

### 2. Customer Management

- **Get All Customers**: `GET /api/v1/customer/all`
- **Get Customer by ID**: `GET /api/v1/customer/:id`
- **Create Customer**: `POST /api/v1/customer/create`
- **Update Customer**: `PATCH /api/v1/customer/:id`
- **Delete Customer**: `DELETE /api/v1/customer/:id`

### 3. Payment Management

- **Get All Payments**: `GET /api/v1/payment/all`
- **Get Payment by ID**: `GET /api/v1/payment/:id`
- **Create Payment**: `POST /api/v1/payment/create`
- **Update Payment**: `PATCH /api/v1/payment/:id`
- **Delete Payment**: `DELETE /api/v1/payment/:id`
- **Refund Payment**: `POST /api/v1/payment/:id/refund`

### 4. Invoice Management

- **Get All Invoices**: `GET /api/v1/invoice/all`
- **Get Invoice by ID**: `GET /api/v1/invoice/:id`
- **Create Invoice**: `POST /api/v1/invoice/create`
- **Update Invoice**: `PATCH /api/v1/invoice/:id`
- **Delete Invoice**: `DELETE /api/v1/invoice/:id`

### 5. Tranzila Payment

- **Create Tranzila Payment**: `POST /api/v1/tranzila-payment/create`
- **Get Tranzila Payment by ID**: `GET /api/v1/tranzila-payment/:id`
- **Get All Tranzila Payments**: `GET /api/v1/tranzila-payment/all`

### 6. User Management

- **Get All Users**: `GET /api/v1/user/all`
- **Get User by ID**: `GET /api/v1/user/:id`
- **Update User**: `PATCH /api/v1/user/:id`
- **Delete User**: `DELETE /api/v1/user/:id`

### 7. Department Management

- **Get All Departments**: `GET /api/v1/department/all`
- **Create Department**: `POST /api/v1/department/create`

### 8. Insurance Company Management

- **Get All Insurance Companies**: `GET /api/v1/company/all`
- **Create Insurance Company**: `POST /api/v1/company/create`

### 9. Audit Management

- **Get All Audit Logs**: `GET /api/v1/audit/all`
- **Get Audit Logs by User**: `GET /api/v1/audit/user/:userId`

### 10. Notification Management

- **Get All Notifications**: `GET /api/v1/notification/all`
- **Create Notification**: `POST /api/v1/notification/create`

### 11. Cheque Management

- **Get All Cheques**: `GET /api/v1/cheques?page=1&limit=10`
- **Get Cheque by ID**: `GET /api/v1/cheques/:id`
- **Create Cheque**: `POST /api/v1/cheques/create` (multipart/form-data)
- **Update Cheque Status**: `PATCH /api/v1/cheques/:id/status`
- **Delete Cheque**: `DELETE /api/v1/cheques/:id`
- **Get Customer Cheques**: `GET /api/v1/cheques/customer/:customerId`
- **Get Cheque Statistics**: `GET /api/v1/cheques/stats`
- **Bulk Update Cheque Status**: `PATCH /api/v1/cheques/bulk-update-status`

### 12. Vehicle Management

- **Add Vehicle**: `POST /api/v1/vehicle/addVehicle` (multipart/form-data)
- **Get All Vehicles**: `GET /api/v1/vehicle/allVehicles`
- **Get Vehicle by ID**: `GET /api/v1/vehicle/findVehicle/:id`
- **Update Vehicle**: `PATCH /api/v1/vehicle/updateVehicle/:id` (multipart/form-data)
- **Delete Vehicle**: `DELETE /api/v1/vehicle/deleteVehicle/:id`

### 13. Document Settings

- **Get All Document Settings**: `GET /api/v1/document-settings`
- **Create Document Settings**: `POST /api/v1/document-settings`

### 14. Call Management

- **Get Call Recording**: `POST /api/v1/call/calls/:customerId`

### 15. Agents Management

- **Get All Agents**: `GET /api/v1/agents/all`
- **Add Agent**: `POST /api/v1/agents/addAgents`

### 16. Accident Reports

- **Takaful Accident Report - Add**: `POST /api/v1/takaful-accident-report/add/:plateNumber`
- **Takaful Accident Report - Get All**: `GET /api/v1/takaful-accident-report/all`
- **Trust Accident Report - Add**: `POST /api/v1/trust-accident-report/add/:plateNumber`
- **Al Ahlia Accident Report - Add**: `POST /api/v1/al-ahlia-accident/addAccidentReport/:plateNumber`
- **Palestine Accident Report - Add**: `POST /api/v1/palestine-accident-report/add/:plateNumber`
- **Al Mashreq Accident Report - Add**: `POST /api/v1/al-mashreq-accident-report/add/:plateNumber`
- **Holy Lands Report - Add**: `POST /api/v1/holy-lands-report/add/:plateNumber`

### 17. System Monitoring

- **Health Check**: `GET /api/v1/health`
- **Get Metrics**: `GET /metrics`
- **Cache Stats**: `GET /api/v1/cache/stats`
- **Clear Cache**: `POST /api/v1/cache/clear`

### 18. Legacy v2 Endpoints

- **Payment v2 - Get All**: `GET /api/v1/payment-v2/all`
- **Invoice v2 - Get All**: `GET /api/v1/invoice-v2/getAllInvoices`
- **Customer v2 - Get All**: `GET /api/v1/customer-v2/getAllCustomers`

## Request Examples

### Create Customer

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St",
  "nationalId": "123456789"
}
```

### Create Payment

```json
{
  "customerId": "customer_id_here",
  "invoiceId": "invoice_id_here",
  "amount": 1000.0,
  "paymentMethod": "cash",
  "paymentDate": "2024-01-15"
}
```

### Create Invoice

```json
{
  "customerId": "customer_id_here",
  "amount": 1000.0,
  "dueDate": "2024-02-15",
  "description": "Insurance premium payment"
}
```

### Create Cheque (multipart/form-data)

- **chequeNumber**: "CHK001"
- **amount**: "1000.00"
- **issueDate**: "2024-01-15"
- **dueDate**: "2024-02-15"
- **customerId**: "customer_id_here"
- **chequeImage**: [file upload]

### Add Vehicle (multipart/form-data)

- **plateNumber**: "ABC123"
- **brand**: "Toyota"
- **model**: "Camry"
- **year**: "2020"
- **image**: [file upload]

## Environment Variables

### Required Variables

- `baseUrl`: Base URL for the API (default: `http://localhost:3002`)
- `authToken`: JWT authentication token (auto-populated after sign-in)

### Optional Variables

- `customerId`: Customer ID for testing customer-specific endpoints
- `vehicleId`: Vehicle ID for testing vehicle-specific endpoints
- `plateNumber`: Plate number for testing accident report endpoints

## Troubleshooting

### Common Issues

1. **"Access token is required"**

   - Ensure you've run the "Sign In" request first
   - Check that the auth token is properly saved in the environment

2. **"Too many requests"**

   - Rate limit is set to 1000 requests per hour
   - Wait for the rate limit window to reset

3. **"Incorrect route"**

   - Verify the endpoint URL is correct
   - Check that the server is running on the correct port

4. **File upload issues**
   - Ensure you're using `multipart/form-data` for file uploads
   - Check file size limits

### Testing Checklist

- [ ] Server is running on port 3002
- [ ] Database is connected and seeded
- [ ] Authentication token is valid
- [ ] Request body format is correct
- [ ] Required fields are provided
- [ ] File uploads use correct format

## Notes

- All endpoints require authentication except for sign-in
- File uploads use `multipart/form-data` format
- The collection includes automatic token management
- Rate limiting is configured at 1000 requests per hour
- All endpoints return JSON responses
- Error responses include detailed error messages

## Support

For issues or questions about the API collection, please refer to the main project documentation or contact the development team.
