import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

// Test user data
const testUser = {
  name: 'Test Admin',
  email: 'test@example.com',
  password: 'testpassword123'
};

async function testUserCreation() {
  console.log('🧪 Testing User Creation...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/add`, testUser);
    console.log('✅ User creation response:', response.data);
    return true;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message === 'user already exists') {
      console.log('⚠️  User already exists (expected if running multiple times)');
      return true;
    }
    console.error('❌ User creation failed:', error.response?.data || error.message);
    return false;
  }
}

async function testUserLogin() {
  console.log('\n🧪 Testing User Login...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login response:', {
      message: response.data.message,
      token: response.data.token ? 'Token received' : 'No token',
      user: response.data.user ? 'User data received' : 'No user data'
    });
    return true;
  } catch (error) {
    console.error('❌ User login failed:', error.response?.data || error.message);
    return false;
  }
}

async function testUserLoginWithWrongPassword() {
  console.log('\n🧪 Testing User Login with Wrong Password...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
      email: testUser.email,
      password: 'wrongpassword'
    });
    console.log('❌ Login should have failed but succeeded:', response.data);
    return false;
  } catch (error) {
    if (error.response?.status === 401 && error.response?.data?.message === 'please ensure that your password is correct') {
      console.log('✅ Login correctly rejected with wrong password');
      return true;
    }
    console.error('❌ Unexpected error with wrong password:', error.response?.data || error.message);
    return false;
  }
}

async function testUserLoginWithNonExistentUser() {
  console.log('\n🧪 Testing User Login with Non-existent User...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
      email: 'nonexistent@example.com',
      password: 'anypassword'
    });
    console.log('❌ Login should have failed but succeeded:', response.data);
    return false;
  } catch (error) {
    if (error.response?.status === 404 && error.response?.data?.message === 'user not found') {
      console.log('✅ Login correctly rejected for non-existent user');
      return true;
    }
    console.error('❌ Unexpected error with non-existent user:', error.response?.data || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting User Endpoint Tests...\n');
  
  const results = [];
  
  results.push(await testUserCreation());
  results.push(await testUserLogin());
  results.push(await testUserLoginWithWrongPassword());
  results.push(await testUserLoginWithNonExistentUser());
  
  console.log('\n📊 Test Results Summary:');
  console.log('=' .repeat(50));
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! User endpoints are working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the details above.');
  }
  
  return passed === total;
}

// Run the tests
runAllTests().catch(console.error);
