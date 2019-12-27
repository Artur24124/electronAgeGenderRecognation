import { fork } from 'redux-saga/effects';

import { screensSagas } from './screens';

export default function* () {
    yield fork(screensSagas);
}