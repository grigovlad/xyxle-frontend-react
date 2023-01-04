import React from 'react';
import {createRoot} from 'react-dom/client';

import {AppInit} from '@shared-components';

import RoleManagement from './RoleManagement';

import {MODULE_NAME} from '@constant';

$.fn.extend({
  roleManagementModule : config => {
    const container = document.getElementById('react-role-management-app');
    const root = createRoot(container);

    root.render(
      <AppInit
        component={RoleManagement}
        config={config}
        name={MODULE_NAME.ROLE_MANAGEMENT}
      />
    );
  }
});

const $module = $('#react-role-management-app');
const dataInit = $module.data('init');

if (dataInit) {
  eval(dataInit)($module); // eslint-disable-line
}
