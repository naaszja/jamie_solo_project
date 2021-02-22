import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEquipment(action) {
    const response = yield axios.get(`/api/equipmentList`) ;
    console.log(`Response.data is:`, response.data);
    yield put({type: 'SET_EQUIPMENT', payload: response.data }) 
}

function* equipmentSaga() {
    yield takeEvery('FETCH_EQUIPMENT', fetchEquipment);
}

export default equipmentSaga;