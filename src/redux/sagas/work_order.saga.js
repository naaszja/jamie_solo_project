import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkOrders(action) {
    console.log
    yield axios.get(`/api/workOrders`) ;
    put({type: 'SET_WORKORDERS', payload: response.data}) 
}

function* workOrderSaga() {
    yield takeLatest('FETCH_WORKORDERS', fetchWorkOrders);
}

export default workOrderSaga;