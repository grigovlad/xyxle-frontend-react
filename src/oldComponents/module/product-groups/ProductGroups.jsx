import React from 'react';

import {ViewListFormSwitch} from '@shared-components';
import {ProductGroupsList} from '@components';

const ProductGroups = () => (
  <ViewListFormSwitch
    formComponent={() => 'Form'}
    listComponent={ProductGroupsList}
  />
);

ProductGroups.displayName = 'ProductGroups';

export default React.memo(ProductGroups);
