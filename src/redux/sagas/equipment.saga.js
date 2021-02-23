import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEquipment(action) {
    const response = yield axios.get(`/api/equipmentList`);
    console.log(`Response.data is:`, response.data);
    yield put({ type: 'SET_EQUIPMENT', payload: response.data });
}

function* addEquipment(action) {
    try {
        console.log(`action.payload is:`, action.payload);
        debugger;
        yield axios.post(`api/equipmentList`, action.payload);
        yield put({ type: 'FETCH_EQUIPMENT' });
    } catch (error) {
        console.log('Error adding equipment', error);
    }

}

function* equipmentSaga() {
    yield takeEvery('FETCH_EQUIPMENT', fetchEquipment);
    yield takeEvery('ADD_EQUIPMENT', addEquipment);
}

export default equipmentSaga;