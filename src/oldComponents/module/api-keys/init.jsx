import React from 'react';
import {createRoot} from 'react-dom/client';

import {AppInit} from '@shared-components';

import ApiKeys from './ApiKeys';

import {MODULE_NAME} from '@constant';

$.fn.extend({
  apiKeysModule : config => {
    const container = document.getElementById('react-api-keys-app');
    const root = createRoot(container);

    root.render(
      <AppInit
        component={ApiKeys}
        config={config}
        name={MODULE_NAME.API_KEYS}
      />
    );
  }
});

const $module = $('#react-api-keys-app');
const dataInit = $module.data('init');

if (dataInit) {
  eval(dataInit)($module); // eslint-disable-line
}
