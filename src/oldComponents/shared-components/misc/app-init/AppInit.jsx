import React, {useEffect} from 'react';
import {object, elementType, string} from 'prop-types';

import {Provider, useDispatch} from 'react-redux';
import {configureStore} from '@store';

import {setAppConfig} from '@store/action/appConfig';
import sagas from '@saga';

import {ToastProvider} from '@shared-components';

import '@resources/i18n';
import {useTranslation} from 'react-i18next';

const store = configureStore({});

sagas.map(saga => store.runSaga(saga));

const App = ({component: Component, name, config}) => {
  const [, i18n] = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(config.locale);
    dispatch(setAppConfig({
      moduleKey : name,
      config
    }));
  }, [dispatch, config, i18n, name]);

  App.displayName = name;

  return (
    <Component config={config} />
  );
};

App.propTypes = {
  component : elementType,
  config    : object,
  name      : string
};

App.defaultProps = {
  component : () => null,
  config    : {},
  name      : 'DefaultApp'
};

const AppInit = props => (
  <Provider store={store}>
    <ToastProvider>
      <App {...props} />
    </ToastProvider>
  </Provider>
);

AppInit.displayName = 'AppInit';

export default AppInit;
