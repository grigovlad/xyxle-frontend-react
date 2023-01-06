import {all, takeEvery} from 'redux-saga/effects';

import {ActionTypes as AppConfigActionTypes} from '../store/action/appConfig';

// Saga example implementation for use when needed
function* onSetAppConfigSaga (action) {
  const {payload : {moduleKey, config}} = yield action;

  console.log('Test from saga: ', moduleKey, config); // eslint-disable-line
}

export default function* testSaga () {
  yield all([
    takeEvery(AppConfigActionTypes.SET_APP_CONFIG, onSetAppConfigSaga)
  ]);
}
