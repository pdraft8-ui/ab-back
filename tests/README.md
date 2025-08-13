# Insurance System Test Suite

This directory contains comprehensive unit and integration tests for the Insurance Management System.

## 📁 Test Structure

```
tests/
├── setup.js                    # Jest setup and configuration
├── utils/
│   └── testHelpers.js         # Test utilities and helper functions
├── controllers/               # Unit tests for controllers
│   ├── customer.controller.test.js
│   ├── invoice.controller.test.js
│   ├── payment.controller.test.js
│   └── user.controller.test.js
├── integration/               # Integration tests for API endpoints
│   └── api.test.js
├── run-tests.js              # Test runner script
└── README.md                 # This file
```

## 🚀 Running Tests

### All Tests

```bash
npm run test:all
```

### Unit Tests Only

```bash
npm run test:unit
```

### Integration Tests Only

```bash
npm run test:integration
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

## 🧪 Test Categories

### 1. Unit Tests (`tests/controllers/`)

Tests individual controller functions in isolation:

- **Customer Controller**: CRUD operations, insurance management, vehicle management
- **Invoice Controller**: Invoice creation, updates, status management, statistics
- **Payment Controller**: Payment processing, refunds, balance updates
- **User Controller**: Authentication, user management, password changes

### 2. Integration Tests (`tests/integration/`)

Tests complete API endpoints and workflows:

- **API Endpoints**: Full request/response cycles
- **Authentication**: Login, registration, token validation
- **Data Flow**: Complete business processes
- **Error Handling**: API error responses

## 🛠️ Test Utilities

### `testHelpers.js`

Provides common test utilities:

- **Test Data Creation**: `createTestUser()`, `createTestCustomer()`, etc.
- **Mock Objects**: `createMockRequest()`, `createMockResponse()`, `createMockNext()`
- **Authentication**: `generateTestToken()`
- **Cleanup**: `cleanupTestData()`

### Test Data Constants

```javascript
TEST_DATA = {
  USER: { name, email, password, role, department },
  CUSTOMER: { first_name, last_name, id_Number, phone_number, ... },
  VEHICLE: { plateNumber, model, type, ownership, ... },
  INSURANCE: { insuranceType, insuranceCompany, insuranceAmount, ... }
}
```

## 📊 Test Coverage

The test suite covers:

- ✅ **Controller Functions**: All CRUD operations
- ✅ **Business Logic**: Validation, calculations, status updates
- ✅ **Error Handling**: Invalid inputs, not found scenarios
- ✅ **Authentication**: Token validation, permissions
- ✅ **Database Operations**: Create, read, update, delete
- ✅ **API Endpoints**: Request/response validation
- ✅ **Integration Flows**: Complete business processes

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)

- **ES Modules**: Configured for ES6 import/export
- **MongoDB Memory Server**: In-memory database for tests
- **Coverage**: HTML, LCOV, and text reports
- **Timeout**: 10 seconds per test
- **Environment**: Node.js test environment

### Test Setup (`tests/setup.js`)

- **Database**: MongoDB Memory Server setup
- **Cleanup**: Automatic data cleanup between tests
- **Environment Variables**: Test-specific configuration
- **Mocks**: External service mocks

## 📝 Writing New Tests

### Unit Test Template

```javascript
describe("Controller Name", () => {
  let testUser;
  let testData;

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
    testData = await createTestData();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  describe("functionName", () => {
    it("should perform expected action", async () => {
      const req = createMockRequest({
        body: {
          /* test data */
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await controllerFunction(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Success message",
        })
      );
    });

    it("should handle errors appropriately", async () => {
      // Test error scenarios
    });
  });
});
```

### Integration Test Template

```javascript
describe("API Endpoint", () => {
  let authToken;

  beforeEach(async () => {
    await cleanupTestData();
    const testUser = await createTestUser();
    authToken = generateTestToken(testUser);
  });

  it("should return expected response", async () => {
    const response = await request(app)
      .get("/api/v1/endpoint")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("expectedProperty");
  });
});
```

## 🐛 Debugging Tests

### Common Issues

1. **Database Connection**: Ensure MongoDB Memory Server is running
2. **Async/Await**: Use proper async/await in test functions
3. **Mock Cleanup**: Reset mocks between tests
4. **Test Isolation**: Clean up data between tests

### Debug Commands

```bash
# Run specific test file
npm test -- customer.controller.test.js

# Run tests with verbose output
npm test -- --verbose

# Run tests matching pattern
npm test -- --testNamePattern="createCustomer"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📈 Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## 🔄 Continuous Integration

Tests are automatically run on:

- **Pull Requests**: All tests must pass
- **Main Branch**: Full test suite + coverage
- **Deployment**: Integration tests before deployment

## 📚 Best Practices

1. **Test Isolation**: Each test should be independent
2. **Descriptive Names**: Use clear, descriptive test names
3. **Arrange-Act-Assert**: Structure tests in AAA pattern
4. **Mock External Dependencies**: Don't rely on external services
5. **Test Data**: Use realistic but minimal test data
6. **Error Scenarios**: Test both success and failure cases
7. **Edge Cases**: Test boundary conditions and edge cases

## 🆘 Getting Help

If you encounter issues with tests:

1. Check the test logs for specific error messages
2. Verify database connection and setup
3. Ensure all dependencies are installed
4. Check Jest configuration
5. Review test isolation and cleanup

For more information, refer to the main project documentation or create an issue in the repository.
