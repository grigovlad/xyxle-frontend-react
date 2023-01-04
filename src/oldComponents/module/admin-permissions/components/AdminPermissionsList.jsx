import React, {useState, useEffect, useCallback} from 'react';

import {useTranslation} from 'react-i18next';

import {RequestFactory} from '@resources/middleware';

import {useDropzone} from 'react-dropzone';
import {useWitFileRequest} from '@resources/hooks';

import {useSelector} from 'react-redux';
import {getModuleConfigSelector} from '@store/selector/appConfig';

import {FaDownload, FaUpload} from 'react-icons/fa';
import map from 'lodash/map';

import {Table, Loader, Button} from '@shared-components';

import {MODULE_NAME} from '@constant';

const AdminPermissionsList = () => {
  const [translate] = useTranslation();
  const [isLoading, setIsloading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const config = useSelector(getModuleConfigSelector(MODULE_NAME.ADMIN_PERMISSIONS));
  const {downloadFile, uploadFile} = useWitFileRequest();

  useEffect(() => {
    const getTableData = async () => {
      const request = new RequestFactory({
        resourceUrl : `${config.userServiceUrl}permissions/table`,
        authToken   : config.authToken
      });
      // eslint-disable-next-line
      const {0 : rawTableKeys, 1 : rawTableColumns, ...rawTableData} = await request.get({});

      const mappedTableColumns = map(rawTableColumns, (item, index) => ({
        key       : index,
        dataIndex : index,
        title     : item,
        width     : 200
      }));

      const mappedTableData = map(rawTableData, (item, index) => ({
        key       : index,
        dataIndex : index,
        ...item
      }));

      setColumns(mappedTableColumns);
      setTableData(mappedTableData);

      setIsloading(false);
    };

    setIsloading(true);
    if (config.userServiceUrl) {
      getTableData();
    }
  }, [config]);

  const onDropAccepted = useCallback(async files => {
    setIsloading(true);

    await uploadFile({
      file      : files[0],
      name      : 'excel_import',
      authToken : config.authToken,
      url       : `${config.userServiceUrl}permissions/import`
    });

    setIsloading(false);
  }, [config, uploadFile]);

  const {getRootProps, getInputProps} = useDropzone({
    accept : {
      'text/plain' : ['.xlsx', '.xls']
    },
    onDropAccepted
  });

  const exportPermissions = useCallback(() => {
    const exportFunc = async () => {
      await downloadFile({
        name      : 'Admin-Permissions.xlsx',
        url       : `${config.userServiceUrl}permissions/export`,
        authToken : config.authToken,
        onError   : () => null
      });

      setIsloading(false);
    };

    if (config.userServiceUrl) {
      setIsloading(true);
      exportFunc();
    }
  }, [downloadFile, config]);

  return (
    <React.Fragment>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Button onClick={exportPermissions}>
          <FaDownload />
          <span className="ml-2">{translate('Download permissions file')}</span>
        </Button>
        <div {...getRootProps({className : 'p-0 m-0 border-0 bg-white'})} style={{minHeight : 'auto'}}>
          <input {...getInputProps()} />
          <Button>
            <FaUpload />
            <span className="ml-2">{translate('Upload permissions file')}</span>
          </Button>
        </div>
      </div>
      <div className="mb-4 max-vh-100 overflow-auto">
        <Table
          columns={columns}
          data={tableData}
          tableLayout="fixed"
        />
        <Loader isLoading={isLoading} />
      </div>
    </React.Fragment>
  );
};

AdminPermissionsList.displayName = 'AdminPermissionsList';

export default AdminPermissionsList;
