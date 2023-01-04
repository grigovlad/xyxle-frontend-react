import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {func} from 'prop-types';

import reduce from 'lodash/reduce';

import {FaPlus, FaSearch} from 'react-icons/fa';
import {VscWarning} from 'react-icons/vsc';

import {MODULE_NAME, INITIAL_REQUEST_OPTIONS, TOGGLE_ORDER_DIR_MAP} from '@constant';
import {Table, Pagination, Input, Button, Modal, Loader, useToast} from '@shared-components';
import {useMiddleware} from '@resources/middleware';

import AddGroupModal from './add-group/AddGroupModal';

import {getProductGroupsTableData} from './helpers';

const ProductGroupsList = () => {
  const [translate] = useTranslation();
  const middleware = useMiddleware(MODULE_NAME.PRODUCT_GROUPS);
  const [isLoading, setIsloading] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState();
  const [requestOptions, setRequestOptions] = useState(INITIAL_REQUEST_OPTIONS);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addGroupModalVisible, setAddGroupModalVisible] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();
  const [productGroupsList, setProductGroupsList] = useState({
    list         : [],
    totalRecords : 0
  });

  useEffect(() => {
    setIsloading(true);

    const getProductGroupsList = async () => {
      const {data} = await middleware.get(requestOptions);

      if (data) {
        setProductGroupsList(data);
      }

      setIsloading(false);
    };

    getProductGroupsList();
  }, [middleware, requestOptions]);

  const handleAddResponse = ({error}) => {
    if (error) {
      addErrorToast(reduce(error, (acc, errorItem) => `${acc} ${errorItem.message}`, ''));

      return;
    }

    setAddGroupModalVisible(false);
    setRequestOptions(currentRequestOptions => ({
      ...currentRequestOptions
    }));
    addSuccessToast(translate('Group Saved Successfuly'));
    setItemToEdit(null);
  };

  const handleDeleteResponse = useCallback(({error}) => {
    if (error) {
      addErrorToast(reduce(error, (acc, errorItem) => `${acc} ${errorItem.message}`, ''));

      return;
    }

    setRequestOptions(currentRequestOptions => ({
      ...currentRequestOptions
    }));
    addSuccessToast('Product group deleted successfuly');
    setDeleteModalVisible(false);
  }, [addSuccessToast, addErrorToast]);

  const onDeleteKeyConfirm = useCallback(() => {
    const deleteItem = async () => {
      const {data} = await middleware.delete({
        meta : {
          partialUrl : `/${itemToDelete.id}`
        }
      });

      handleDeleteResponse(data);
    };

    deleteItem();
  }, [middleware, itemToDelete, handleDeleteResponse]);

  const productGroupsListTableData = useMemo(() => getProductGroupsTableData(
    productGroupsList.list,
    {
      onHeaderCell : column => {
        setRequestOptions({
          ...requestOptions,
          orderColumn : column.key,
          orderDir    : TOGGLE_ORDER_DIR_MAP[requestOptions.orderDir]
        });
      },
      onDelete : item => {
        setItemToDelete(item);
        setDeleteModalVisible(true);
      },
      onEdit : item => {
        setItemToEdit({
          ...item
        });
        setAddGroupModalVisible(true);
      },
      translate,
      ...requestOptions
    }
  ), [requestOptions, productGroupsList, setItemToEdit, setAddGroupModalVisible, translate]);

  return (
    <React.Fragment>
      <div className="row mb-4">
        <div className="col-3">
          <Input
            icon={FaSearch}
            onChange={event => {
              setRequestOptions({
                ...requestOptions,
                ...INITIAL_REQUEST_OPTIONS,
                search : event.target.value
              });
            }}
          />
        </div>
        <div className="col-9 text-right">
          <Button onClick={() => setAddGroupModalVisible(true)}>
            <FaPlus />
            <span className="ml-2">{translate('Create new group')}</span>
          </Button>
        </div>
      </div>
      <div className="mb-4 position-relative">
        <Table columns={productGroupsListTableData.columns} data={productGroupsListTableData.data} />
        <Loader isLoading={isLoading} />
      </div>
      <Pagination
        onChange={(page, length) => {
          setRequestOptions({
            ...requestOptions,
            start : length * (page - 1),
            length
          });
        }}
        total={productGroupsList.totalRecords}
      />

      <Modal
        cancelText={translate('Cancel')}
        confirmText={translate('Yes')}
        content={translate('Are you sure you want to delete this item? Deleted items cannot be restored')}
        icon={VscWarning}
        isVisible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={item => onDeleteKeyConfirm(item)}
        title={translate('Warning')}
      />

      {addGroupModalVisible && (
        <AddGroupModal
          handleResponse={handleAddResponse}
          isVisible={addGroupModalVisible}
          itemToEdit={itemToEdit}
          setIsVisible={setAddGroupModalVisible}
        />
      )}
    </React.Fragment>
  );
};

ProductGroupsList.propTypes = {
  setItemToEdit : func.isRequired,
  setViewMode   : func.isRequired
};

ProductGroupsList.displayName = 'ProductGroupsList';

export default React.memo(ProductGroupsList);
