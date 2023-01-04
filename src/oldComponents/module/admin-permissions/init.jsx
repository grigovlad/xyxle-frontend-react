import React from 'react';
import {createRoot} from 'react-dom/client';

import {AppInit} from '@shared-components';

import AdminPermissions from './AdminPermissions';

import {MODULE_NAME} from '@constant';

$.fn.extend({
  adminPermissionsModule : config => {
    const container = document.getElementById('react-admin-permissions-app');
    const root = createRoot(container);

    root.render(
      <AppInit
        component={AdminPermissions}
        config={config}
        name={MODULE_NAME.ADMIN_PERMISSIONS}
      />
    );
  }
});

const $module = $('#react-admin-permissions-app');
const dataInit = $module.data('init');

if (dataInit) {
  eval(dataInit)($module); // eslint-disable-line
}
