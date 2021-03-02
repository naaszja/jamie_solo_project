import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchCustomers(action) {
  const response = yield axios.get(`/api/user`);
  console.log(`Response.data is:`, response.data);
  yield put({ type: 'SET_CUSTOMERS', payload: response.data });
}

function* addCustomer(action) {
  try {
    console.log(`action.payload is:`, action.payload);
    yield axios.post(`api/customerList`, action.payload);
    yield put({ type: 'FETCH_CUSTOMERS' });
  } catch (error) {
    console.log('Error adding customer', error);
  }
}

function* deleteCustomer(action) {
  try {
    yield axios.delete(`api/customerList/${action.payload}`);
  } catch (error) {
    console.log('Error deleting customer!', error);
  }
}

function* currentCustomer(action) {
  try {
    yield axios.get(`api/customerList/${action.payload}`);
    yield put({ type: 'SET_CURRENT', payload: response.data })
  } catch (error) {
    console.log('Error setting current customer!', error);
  }
}
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_CUSTOMERS', fetchCustomers);
  yield takeLatest('ADD_USER', addCustomer);
  yield takeLatest('DELETE_CUSTOMER', deleteCustomer);
  yield takeLatest('CURRENT_CUSTOMER', currentCustomer);
}

export default userSaga;
