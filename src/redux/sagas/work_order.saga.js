import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkOrders(action) {
    const response = yield axios.get(`/api/workOrders`) ;
    console.log(`Response.data is:`, response.data);
    yield put({type: 'SET_WORKORDERS', payload: response.data }) 
}

function* workOrderSaga() {
    yield takeEvery('FETCH_WORKORDERS', fetchWorkOrders);
}

export default workOrderSaga;