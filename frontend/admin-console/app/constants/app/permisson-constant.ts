import type { Permission } from '~/types/module-types/permission';

export const PermissionTableHeader = [
  { label: 'ID', key: '_id', sortable: true },
  { label: 'Tên', key: 'name', sortable: false },
  { label: 'API Path', key: 'apiPath', sortable: true },
  { label: 'Method', key: 'method', sortable: true },
  { label: 'Module', key: 'module', sortable: true },
  { label: 'Trạng thái', key: 'isActive', sortable: true },
  { label: 'Ngày tạo', key: 'createdAt', sortable: true }, 
  { label: 'Ngày sửa', key: 'updatedAt', sortable: false },
  { label: 'Hành động', key: 'actions', sortable: false },
];
