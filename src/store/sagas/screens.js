import { call, takeEvery, put } from 'redux-saga/effects';
import * as screensActions from '../actions/screens';

import {
    createScreen,
    getAllScreens
} from '../../api';

function* createScreenSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(createScreen, payload);
        yield put(screensActions.createScreenSuccess(response));
    } catch (e) {
        yield put(screensActions.createScreenError(e));
    }
}

function* getAllScreensSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(getAllScreens, payload);
        yield put(screensActions.getAllScreensSuccess(response));
    } catch (e) {
        yield put(screensActions.getAllScreensError(e));
    }
}

export function* screensSagas() {
    yield takeEvery(
        screensActions.createScreen.toString(),
        createScreenSaga
    );

    yield takeEvery(
        screensActions.getAllScreens.toString(),
        getAllScreensSaga
    );
}