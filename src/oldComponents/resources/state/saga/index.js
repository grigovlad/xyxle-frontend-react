import {fork, all} from 'redux-saga/effects';
import testSaga from './test';

const appSagas = function* appSagas () {
  yield all([
    fork(testSaga)
  ]);
};

const sagas = [
  appSagas
];

export default sagas;
