import React from 'react';
import cx from 'classnames';

import {FaPen, FaTrashAlt} from 'react-icons/fa';
import {Icon} from '@shared-components';

import map from 'lodash/map';

const getRolesTableData = (rolesList = [], {onHeaderCell, onEdit, onDelete, translate, orderDir, orderColumn}) => {
  const columns = [
    {
      title     : translate('Name'),
      dataIndex : 'name',
      key       : 'name',
      width     : '30%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'name'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Users'),
      dataIndex : 'usersNumber',
      key       : 'usersNumber',
      width     : '10%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'usersNumber'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Permissions'),
      dataIndex : 'permissions',
      key       : 'permissions',
      width     : '30%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'permissions'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Created at'),
      dataIndex : 'createdAt',
      key       : 'createdAt',
      width     : '10%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'createdAt'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Actions'),
      dataIndex : '',
      key       : 'actions',
      width     : '20%',
      render    : item => ( // eslint-disable-line
        <>
          <Icon icon={FaPen} onClick={() => onEdit(item)} />
          <Icon className="icon--danger ml-2" icon={FaTrashAlt} onClick={() => onDelete(item)} />
        </>
      )
    }
  ];

  const data = map(rolesList, item => ({
    ...item,
    key : `${item.id}`
  }));


  return {
    columns,
    data
  };
};

export {
  getRolesTableData
};
