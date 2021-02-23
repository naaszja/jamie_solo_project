import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCustomers(action) {
    const response = yield axios.get(`/api/customerList`);
    console.log(`Response.data is:`, response.data);
    yield put({type: 'SET_CUSTOMERS', payload: response.data }) 
}

function* addCustomer(action) {
    try {
        console.log(`action.payload is:`, action.payload)
        yield axios.post(`api/customerList`, action.payload);
        yield put({type: 'FETCH_CUSTOMERS'})
    } catch (error) {
        console.log('Error adding customer', error)
    }
}

function* customerSaga() {
    yield takeLatest('FETCH_CUSTOMERS', fetchCustomers);
    yield takeLatest('ADD_CUSTOMER', addCustomer);
}

export default customerSaga;