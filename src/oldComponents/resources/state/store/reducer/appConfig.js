import {handleActions} from 'redux-actions';
import {ActionTypes} from '../action/appConfig';

const initialState = {};

const setAppConfigReducer = (state, {payload : {moduleKey, config}}) => ({
  ...state,
  [moduleKey] : config
});

const cleanupReducer = () => initialState;

const appConfigReducer = handleActions({
  [ActionTypes.SET_APP_CONFIG] : setAppConfigReducer,

  cleanup : cleanupReducer
}, initialState);

export default appConfigReducer;
