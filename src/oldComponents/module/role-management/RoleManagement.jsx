import React from 'react';

import {ViewListFormSwitch} from '@shared-components';
import {RolesList} from '@components';

const RoleManagement = () => (
  <ViewListFormSwitch
    formComponent={() => 'Form'}
    listComponent={RolesList}
  />
);

RoleManagement.displayName = 'RoleManagement';

export default React.memo(RoleManagement);
