import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import appReducers from './reducer';

const rootReducer = combineReducers(appReducers);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware
];

const configureStore = preloadedState => ({
  ...createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  ),
  runSaga : sagaMiddleware.run
});

export default configureStore;
