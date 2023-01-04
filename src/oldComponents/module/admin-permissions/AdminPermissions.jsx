import React from 'react';

import {ViewListFormSwitch} from '@shared-components';
import {AdminPermissionsList} from '@components';

const AdminPermissions = () => (
  <ViewListFormSwitch
    formComponent={() => null}
    listComponent={AdminPermissionsList}
  />
);

AdminPermissions.displayName = 'AdminPermissions';

export default AdminPermissions;
