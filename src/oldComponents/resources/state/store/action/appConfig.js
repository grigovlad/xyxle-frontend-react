import {createAction} from 'redux-actions';

const PREFIX = 'appConfig::';

export const ActionTypes = {
  SET_APP_CONFIG : `${PREFIX}SET_APP_CONFIG`
};

export const setAppConfig = createAction(ActionTypes.SET_APP_CONFIG);
