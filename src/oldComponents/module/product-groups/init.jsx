import React from 'react';
import {createRoot} from 'react-dom/client';

import {AppInit} from '@shared-components';

import ProductGroups from './ProductGroups';

import {MODULE_NAME} from '@constant';

$.fn.extend({
  productGroupsModule : config => {
    const container = document.getElementById('react-product-groups-app');
    const root = createRoot(container);

    root.render(
      <AppInit
        component={ProductGroups}
        config={config}
        name={MODULE_NAME.PRODUCT_GROUPS}
      />
    );
  }
});

const $module = $('#react-product-groups-app');
const dataInit = $module.data('init');

if (dataInit) {
  eval(dataInit)($module); // eslint-disable-line
}
