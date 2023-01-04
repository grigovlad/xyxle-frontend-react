import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {func} from 'prop-types';

import reduce from 'lodash/reduce';

import {FaPlus, FaSearch} from 'react-icons/fa';
import {VscWarning} from 'react-icons/vsc';

import {MODULE_NAME, VIEW_MODE, INITIAL_REQUEST_OPTIONS, TOGGLE_ORDER_DIR_MAP} from '@constant';
import {Table, Pagination, Input, Button, Modal, Loader, useToast} from '@shared-components';
import {useMiddleware} from '@resources/middleware';

import {getApiKeysTableData} from './helpers';

const ApiKeysList = ({setViewMode, setItemToEdit}) => {
  const [translate] = useTranslation();
  const middleware = useMiddleware(MODULE_NAME.API_KEYS);
  const [isLoading, setIsloading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [apiKeysList, setApiKeysList] = useState({
    list         : [],
    totalRecords : 0
  });
  const [requestOptions, setRequestOptions] = useState(INITIAL_REQUEST_OPTIONS);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {addSuccessToast, addErrorToast} = useToast();

  useEffect(() => {
    setIsloading(true);

    const getApiKeysList = async () => {
      const {data} = await middleware.get(requestOptions);

      if (data) {
        setApiKeysList(data);
      }

      setIsloading(false);
    };

    getApiKeysList();
  }, [middleware, requestOptions]);

  const handleDeleteResponse = useCallback(({error}) => {
    if (error) {
      addErrorToast(reduce(error, (acc, errorItem) => `${acc} ${errorItem.message}`, ''));

      return;
    }

    setRequestOptions(currentRequestOptions => ({
      ...currentRequestOptions
    }));
    addSuccessToast('Api Key deleted successfuly');
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

  const apiKeysTableData = useMemo(() => getApiKeysTableData(
    apiKeysList.list,
    {
      onHeaderCell : column => {
        setRequestOptions({
          ...requestOptions,
          orderColumn : column.key === 'apiKey' ? 'key' : column.key,
          orderDir    : TOGGLE_ORDER_DIR_MAP[requestOptions.orderDir]
        });
      },
      onDeleteKey : item => {
        setItemToDelete(item);
        setDeleteModalVisible(true);
      },
      onEditKey : item => {
        setItemToEdit({
          ...item,
          key : item.apiKey
        });
        setViewMode(VIEW_MODE.EDIT);
      },
      translate,
      ...requestOptions
    }
  ), [requestOptions, apiKeysList, setItemToEdit, setViewMode, translate]);

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
          <Button onClick={() => setViewMode(VIEW_MODE.CREATE)}>
            <FaPlus />
            <span className="ml-2">{translate('Create A Key')}</span>
          </Button>
        </div>
      </div>
      <div className="mb-4 position-relative">
        <Table columns={apiKeysTableData.columns} data={apiKeysTableData.data} />
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
        total={apiKeysList.totalRecords}
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
    </React.Fragment>
  );
};

ApiKeysList.propTypes = {
  setItemToEdit : func.isRequired,
  setViewMode   : func.isRequired
};

ApiKeysList.displayName = 'ApiKeysList';

export default ApiKeysList;
