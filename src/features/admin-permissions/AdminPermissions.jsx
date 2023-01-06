import React from 'react';

import ViewListFormSwitch from '../../components/ui/misc/view-list-form-switch/ViewListFormSwitch';
import AdminPermissionsList from './components/AdminPermissionsList';

const AdminPermissions = () => (
  <ViewListFormSwitch
    formComponent={() => null}
    listComponent={AdminPermissionsList}
  />
);

AdminPermissions.displayName = 'AdminPermissions';

export default AdminPermissions;
