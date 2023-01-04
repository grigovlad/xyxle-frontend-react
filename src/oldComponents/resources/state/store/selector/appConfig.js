import {createSelector} from 'reselect';
import get from 'lodash/get';

const appConfigSelector = state => state.appConfig;

export const getModuleConfigSelector = module => createSelector(
  [appConfigSelector],
  appConfig => get(appConfig, module, {})
);
