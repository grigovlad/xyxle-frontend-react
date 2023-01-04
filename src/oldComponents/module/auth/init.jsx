import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

import {AppInit} from '@shared-components';

import {MODULE_NAME} from '@constant';

import Auth from './Auth';

$.fn.extend({
  authModule : config => {
    const container = document.getElementById('react-auth-app');
    const root = createRoot(container);

    const WithRouterAuth = () => (
      <Router>
        <Auth />
      </Router>
    );

    WithRouterAuth.displayName = 'WithRouterAuth';

    root.render(
      <AppInit
        component={WithRouterAuth}
        config={config}
        name={MODULE_NAME.AUTH}
      />
    );
  }
});

const $module = $('#react-auth-app');
const dataInit = $module.data('init');

if (dataInit) {
  eval(dataInit)($module); // eslint-disable-line
}
