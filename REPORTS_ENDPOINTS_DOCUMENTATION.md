# Reports Endpoints Documentation

This document provides comprehensive documentation for all the Reports endpoints in the AB Insurance API.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Common Query Parameters](#common-query-parameters)
4. [Endpoints](#endpoints)
   - [Cheque Reports](#cheque-reports)
   - [Due Amounts Reports](#due-amounts-reports)
   - [Agent Customers Reports](#agent-customers-reports)
   - [Agent Insurances Reports](#agent-insurances-reports)
   - [Expired Insurance Reports](#expired-insurance-reports)
5. [Response Format](#response-format)
6. [Examples](#examples)
7. [Error Handling](#error-handling)

## Overview

The Reports module provides comprehensive reporting capabilities for:

- Cheque management with filtering and status tracking
- Due amounts tracking for invoices
- Agent performance analysis (customers and insurances)
- Insurance expiry monitoring

All endpoints support pagination, filtering, and sorting for efficient data retrieval.

## Authentication

All Reports endpoints require authentication with the following roles:

- `admin`
- `manager`
- `headOfDepartment`

**Header**: `Authorization: Bearer <token>`

## Common Query Parameters

Most endpoints support these common parameters:

| Parameter   | Type   | Default | Description                    |
| ----------- | ------ | ------- | ------------------------------ |
| `page`      | number | 1       | Page number for pagination     |
| `limit`     | number | 10      | Number of items per page       |
| `sortBy`    | string | varies  | Field to sort by               |
| `sortOrder` | string | varies  | Sort order: `asc` or `desc`    |
| `startDate` | string | -       | Start date filter (YYYY-MM-DD) |
| `endDate`   | string | -       | End date filter (YYYY-MM-DD)   |

## Endpoints

### 1. Cheque Reports

**Endpoint**: `GET /api/v1/reports/cheques`

**Description**: Get comprehensive cheque reports with filtering by date, status, and pagination.

**Query Parameters**:

- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `status` (optional): Cheque status filter (`Pending`, `Cleared`, `Bounced`, `all`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: `createdAt`)
- `sortOrder` (optional): Sort order (default: `desc`)

**Response Example**:

```json
{
  "success": true,
  "message": "Cheque report retrieved successfully",
  "data": {
    "cheques": [
      {
        "_id": "cheque_id",
        "chequeNumber": "CHK001",
        "amount": 1000,
        "status": "Pending",
        "issueDate": "2024-01-15",
        "dueDate": "2024-02-15",
        "customerId": {
          "_id": "customer_id",
          "first_name": "John",
          "last_name": "Doe",
          "phone_number": "+1234567890"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 25,
      "totalPages": 3
    },
    "summary": {
      "totalAmount": 25000,
      "totalCount": 25,
      "pendingAmount": 15000,
      "pendingCount": 15,
      "clearedAmount": 8000,
      "clearedCount": 8,
      "bouncedAmount": 2000,
      "bouncedCount": 2
    },
    "filters": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "status": "all",
      "sortBy": "createdAt",
      "sortOrder": "desc"
    }
  }
}
```

### 2. Due Amounts Reports

**Endpoint**: `GET /api/v1/reports/due-amounts`

**Description**: Get reports of outstanding invoice amounts with filtering and categorization.

**Query Parameters**:

- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `status` (optional): Invoice status filter (`Pending`, `Partially Paid`, `Overdue`, `all`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: `balanceDue`)
- `sortOrder` (optional): Sort order (default: `desc`)

**Response Example**:

```json
{
  "success": true,
  "message": "Due amounts report retrieved successfully",
  "data": {
    "invoices": [
      {
        "_id": "invoice_id",
        "invoiceNumber": "INV001",
        "totalAmount": 2000,
        "balanceDue": 1500,
        "status": "Partially Paid",
        "dueDate": "2024-02-15",
        "customerId": {
          "_id": "customer_id",
          "first_name": "John",
          "last_name": "Doe",
          "phone_number": "+1234567890"
        },
        "insurancePolicy": {
          "_id": "policy_id",
          "policyNumber": "POL001",
          "insuranceType": "Comprehensive"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 30,
      "totalPages": 3
    },
    "summary": {
      "totalDueAmount": 45000,
      "totalInvoices": 30,
      "pendingAmount": 20000,
      "pendingCount": 15,
      "partiallyPaidAmount": 15000,
      "partiallyPaidCount": 10,
      "overdueAmount": 10000,
      "overdueCount": 5
    },
    "filters": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "status": "all",
      "sortBy": "balanceDue",
      "sortOrder": "desc"
    }
  }
}
```

### 3. Agent Customers Reports

**Endpoint**: `GET /api/v1/reports/agent-customers`

**Description**: Get reports of customers who were brought in by agents (customers with non-null agent field).

**Query Parameters**:

- `agentId` (optional): Specific agent ID filter
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: `createdAt`)
- `sortOrder` (optional): Sort order (default: `desc`)

**Response Example**:

```json
{
  "success": true,
  "message": "Agent customers report retrieved successfully",
  "data": {
    "customers": [
      {
        "_id": "customer_id",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+1234567890",
        "email": "john@example.com",
        "agent": {
          "_id": "agent_id",
          "name": "Agent Name",
          "email": "agent@example.com",
          "phone": "+0987654321"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 50,
      "totalPages": 5
    },
    "summary": {
      "totalCustomers": 50,
      "uniqueAgents": 8
    },
    "filters": {
      "agentId": "",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "sortBy": "createdAt",
      "sortOrder": "desc"
    }
  }
}
```

### 4. Agent Insurances Reports

**Endpoint**: `GET /api/v1/reports/agent-insurances`

**Description**: Get reports of insurance policies that were sold by agents (insurances with non-null agent field).

**Query Parameters**:

- `agentId` (optional): Specific agent ID filter
- `insuranceType` (optional): Insurance type filter (`Comprehensive`, `Third Party`, `all`)
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: `createdAt`)
- `sortOrder` (optional): Sort order (default: `desc`)

**Response Example**:

```json
{
  "success": true,
  "message": "Agent insurances report retrieved successfully",
  "data": {
    "insurances": [
      {
        "_id": "insurance_id",
        "policyNumber": "POL001",
        "insuranceType": "Comprehensive",
        "premium": 1500,
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "agent": {
          "_id": "agent_id",
          "name": "Agent Name",
          "email": "agent@example.com",
          "phone": "+0987654321"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 40,
      "totalPages": 4
    },
    "summary": {
      "totalInsurances": 40,
      "uniqueAgents": 6
    },
    "filters": {
      "agentId": "",
      "insuranceType": "all",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "sortBy": "createdAt",
      "sortOrder": "desc"
    }
  }
}
```

### 5. Expired Insurance Reports

**Endpoint**: `GET /api/v1/reports/expired-insurances`

**Description**: Get reports of insurance policies that are expired or will expire soon.

**Query Parameters**:

- `daysThreshold` (optional): Days threshold for "soon to expire" (default: 3)
- `includeExpired` (optional): Include already expired policies (default: true)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (default: `expiryDate`)
- `sortOrder` (optional): Sort order (default: `asc`)

**Response Example**:

```json
{
  "success": true,
  "message": "Expired insurance report retrieved successfully",
  "data": {
    "insurances": [
      {
        "_id": "insurance_id",
        "policyNumber": "POL001",
        "insuranceType": "Comprehensive",
        "premium": 1500,
        "startDate": "2024-01-01",
        "expiryDate": "2024-12-31",
        "customerId": {
          "_id": "customer_id",
          "first_name": "John",
          "last_name": "Doe",
          "phone_number": "+1234567890"
        },
        "agent": {
          "_id": "agent_id",
          "name": "Agent Name",
          "email": "agent@example.com",
          "phone": "+0987654321"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalCount": 15,
      "totalPages": 2
    },
    "summary": {
      "totalInsurances": 15,
      "expiredCount": 5,
      "expiringSoonCount": 10,
      "averageDaysUntilExpiry": 2.5
    },
    "filters": {
      "daysThreshold": 3,
      "includeExpired": true,
      "sortBy": "expiryDate",
      "sortOrder": "asc"
    }
  }
}
```

## Response Format

All Reports endpoints follow a consistent response format:

```json
{
  "success": boolean,
  "message": string,
  "data": {
    "items": array,           // The actual data items
    "pagination": {
      "page": number,
      "limit": number,
      "totalCount": number,
      "totalPages": number
    },
    "summary": object,        // Summary statistics
    "filters": object         // Applied filters
  }
}
```

## Examples

### Example 1: Get Cheques for Last Month

```bash
GET /api/v1/reports/cheques?startDate=2024-01-01&endDate=2024-01-31&status=Pending&page=1&limit=20
```

### Example 2: Get Due Amounts Sorted by Amount

```bash
GET /api/v1/reports/due-amounts?sortBy=balanceDue&sortOrder=desc&limit=50
```

### Example 3: Get Agent Performance

```bash
GET /api/v1/reports/agent-customers?agentId=agent_id_here&startDate=2024-01-01&endDate=2024-12-31
```

### Example 4: Get Insurances Expiring This Week

```bash
GET /api/v1/reports/expired-insurances?daysThreshold=7&includeExpired=false
```

## Error Handling

Reports endpoints return standard HTTP status codes:

- `200 OK`: Success
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `500 Internal Server Error`: Server error

Error response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Cache Management

Reports data is cached for 5 minutes to improve performance. To clear the cache:

**Endpoint**: `POST /api/v1/reports/clear-cache`

**Authentication**: Admin only

**Response**:

```json
{
  "success": true,
  "message": "Reports cache cleared successfully"
}
```

## Notes

- All date filters use ISO 8601 format (YYYY-MM-DD)
- Pagination is zero-based internally but one-based in the API
- Sorting is case-sensitive
- All monetary amounts are returned in the base currency
- Agent reports only include records where the agent field is not null
- Expired insurance reports can be configured to include or exclude already expired policies
