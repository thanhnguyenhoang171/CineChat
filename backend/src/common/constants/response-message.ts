import { BusinessCode } from './business-code';

export const ResponseMessage: Record<BusinessCode, string> = {
  // Generic / System
  [BusinessCode.SUCCESS]: 'Thao tác thành công',
  [BusinessCode.INTERNAL_ERROR]: 'Lỗi hệ thống, vui lòng thử lại sau',

  // MongoDB
  [BusinessCode.INVALID_MONGODB_ID]: 'ID không hợp lệ',

  // User Module
  [BusinessCode.USER_SUCCESS]: 'Thao tác người dùng thành công',
  [BusinessCode.USER_CREATED]: 'Tạo người dùng thành công',
  [BusinessCode.USER_UPDATED]: 'Cập nhật người dùng thành công',
  [BusinessCode.USER_DELETED]: 'Xóa người dùng thành công',
  [BusinessCode.USER_NOT_FOUND]: 'Không tìm thấy người dùng',
  [BusinessCode.DUPLICATE_USERNAME]: 'Tên người dùng đã tồn tại',
  [BusinessCode.DUPLICATE_EMAIL]: 'Email đã tồn tại',

  // Permission Module
  [BusinessCode.PERMISSION_SUCCESS]: 'Thao tác quyền thành công',
  [BusinessCode.PERMISSION_CREATED]: 'Tạo quyền thành công',
  [BusinessCode.PERMISSION_UPDATED]: 'Cập nhật quyền thành công',
  [BusinessCode.PERMISSION_DELETED]: 'Xóa quyền thành công',
  [BusinessCode.PERMISSION_EXIST]: 'Quyền đã tồn tại',
  [BusinessCode.PERMISSION_NOT_FOUND]: 'Không tìm thấy quyền',
  [BusinessCode.PERMISSION_GET_ALL_SUCCESS]: 'Lấy danh sách quyền thành công',
  [BusinessCode.PERMISSION_UPDATED_FAIL]: 'Cập nhật quyền thất bại',
  [BusinessCode.PERMISSION_DELETED_FAIL]: 'Xoá quyền thất bại',

  // Validation / Input
  [BusinessCode.NO_FIELD_UPDATED]:
    'Không có dữ liệu nào được cập nhật (field sai hoặc trùng dữ liệu cũ)',
  [BusinessCode.INVALID_FIELD]: 'Trường không hợp lệ trong schema',
  [BusinessCode.VALIDATION_FAILED]: 'Dữ liệu không hợp lệ',
};
