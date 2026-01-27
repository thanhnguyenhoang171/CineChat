import type { Permission } from '~/types/module-types/permission';

export const PermissionTableHeader = [
  {
    label: 'tableHeader.permission.id',
    key: '_id',
    sortable: true,
    width: 'w-[50px]',
    alwaysShow: true,
  },
  {
    label: 'tableHeader.permission.name',
    key: 'name',
    sortable: false,
    width: 'w-[150px]',
  },
  {
    label: 'tableHeader.permission.apiPath',
    key: 'apiPath',
    sortable: true,
    width: 'w-[200px]',
  },
  {
    label: 'tableHeader.permission.method',
    key: 'method',
    sortable: true,
    width: 'w-12',
  },
  {
    label: 'tableHeader.permission.module',
    key: 'module',
    sortable: true,
    width: 'w-[100px]',
  },
  {
    label: 'tableHeader.permission.status',
    key: 'isActive',
    sortable: true,
    width: 'w-10',
  },
  {
    label: 'tableHeader.permission.createdDate',
    key: 'createdAt',
    sortable: true,
    width: 'w-20',
  },
  {
    label: 'tableHeader.permission.updatedDate',
    key: 'updatedAt',
    sortable: false,
    width: 'w-20',
  },
  {
    label: 'tableHeader.permission.action',
    key: 'actions',
    sortable: false,
    alwaysShow: true,
  },
];
