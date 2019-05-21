import { all, fork } from 'redux-saga/effects';

import notes from './notes';

export default function* rootSaga() {
    yield all([
        fork(notes)
    ]);
}