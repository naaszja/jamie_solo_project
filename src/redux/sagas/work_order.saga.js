import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkOrders(action) {
    const response = yield axios.get(`/api/workOrders`);
    console.log(`Response.data is:`, response.data);
    yield put({ type: 'SET_WORKORDERS', payload: response.data })
}

function* fetchSingleWorkOrder(action) {
    const response = yield axios.get(`/api/workOrders/${action.payload}`);
    console.log(`Response.data is:`, response.data);
    yield put({ type: 'SET_SINGLE_WORKORDER', payload: response.data[0] })
}

function* addCheckIn(action) {
    try {
        yield axios.post('/api/checkIn/:id', action.payload);
    } catch (error) {
        console.log('Error submitting check-in', error);
    }
}

function* addWorkOrder(action) {
try {
    yield axios.post('/api/workOrders', action.payload);
} catch (error) {
    console.log('Error adding work order', error);
}
}

function* completeWorkOrder(action) {
    try {
        yield axios.put('/api/workOrders', action.payload);
    } catch (error) {
        console.log('Error completing work order', error);
    }
}

function* workOrderSaga() {
    yield takeEvery('FETCH_WORKORDERS', fetchWorkOrders);
    yield takeEvery('FETCH_SINGLE_WORKORDER', fetchSingleWorkOrder);
    yield takeEvery('ADD_CHECKIN', addCheckIn);
    yield takeEvery('ADD_WORKORDER', addWorkOrder);
    yield takeEvery('COMPLETE_WORKORDER', completeWorkOrder);
}

export default workOrderSaga;