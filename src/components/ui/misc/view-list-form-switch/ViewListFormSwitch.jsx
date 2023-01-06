import React, {useState} from 'react';
import {elementType} from 'prop-types';

import {VIEW_MODE} from '../../../../data/constant';

const ViewListFormSwitch = ({listComponent : ListComponent, formComponent : FormComponent}) => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.LIST);
  const [itemToEdit, setItemToEdit] = useState();

  if (viewMode === VIEW_MODE.LIST) {
    return (
      <ListComponent setItemToEdit={setItemToEdit} setViewMode={setViewMode} />
    );
  }

  return (
    <FormComponent
      itemToEdit={itemToEdit}
      setItemToEdit={setItemToEdit}
      setViewMode={setViewMode}
      viewMode={viewMode}
    />
  );
};

ViewListFormSwitch.propTypes = {
  formComponent : elementType,
  listComponent : elementType
};
ViewListFormSwitch.defaultProps = {
  formComponent : () => null,
  listComponent : () => null
};
ViewListFormSwitch.displayName = 'ViewListFormSwitch';

export default ViewListFormSwitch;
