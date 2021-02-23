import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCustomers(action) {
    const response = yield axios.get(`/api/customerList`) ;
    console.log(`Response.data is:`, response.data);
    yield put({type: 'SET_CUSTOMERS', payload: response.data }) 
}

function* customerSaga() {
    yield takeEvery('FETCH_CUSTOMERS', fetchCustomers);
}

export default customerSaga;