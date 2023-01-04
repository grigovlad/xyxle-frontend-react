import React from 'react';

import {ViewListFormSwitch} from '@shared-components';
import {ApiKeysList, ApiKeysForm} from '@components';

const ApiKeys = () => (
  <ViewListFormSwitch
    formComponent={ApiKeysForm}
    listComponent={ApiKeysList}
  />
);

ApiKeys.displayName = 'ApiKeys';

export default ApiKeys;
