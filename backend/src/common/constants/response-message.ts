import { BusinessCode } from './business-code';

export const ResponseMessage: Record<BusinessCode, string> = {
  // =========================================================
  // === SYS: GENERIC / SYSTEM MESSAGES ======================
  // =========================================================
  [BusinessCode.SUCCESS]: 'Thao tác thành công.',
  [BusinessCode.VALIDATION_FAILED]: 'Dữ liệu đầu vào không hợp lệ.',
  [BusinessCode.INVALID_MONGODB_ID]: 'ID không đúng định dạng MongoDB.',
  [BusinessCode.NO_FIELD_UPDATED]: 'Không có trường nào được cập nhật.',
  [BusinessCode.UNAUTHORIZED]: 'Xác thực không thành công. Vui lòng đăng nhập lại.',
  [BusinessCode.FORBIDDEN]: 'Bạn không có quyền thực hiện hành động này.',
  [BusinessCode.INTERNAL_SERVER_ERROR]: 'Lỗi hệ thống, vui lòng thử lại sau.',
  [BusinessCode.EMPTY_UPDATE_DTO]: 'Không có dữ liệu nào để cập nhật.',
  // =========================================================
  // === USR: USER MODULE MESSAGES ===========================
  // =========================================================
  [BusinessCode.USER_GET_SUCCESS]: 'Lấy thông tin người dùng thành công.',
  [BusinessCode.USER_CREATED_SUCCESS]: 'Tạo người dùng thành công.',
  [BusinessCode.USER_UPDATED_SUCCESS]: 'Cập nhật thông tin người dùng thành công.',
  [BusinessCode.USER_DELETED_SUCCESS]: 'Xóa người dùng thành công.',
  [BusinessCode.USER_NOT_FOUND]: 'Không tìm thấy người dùng.',
  [BusinessCode.DUPLICATE_USERNAME]: 'Tên người dùng này đã tồn tại.',
  [BusinessCode.DUPLICATE_EMAIL]: 'Email này đã tồn tại.',

  // =========================================================
  // === PER: PERMISSION MODULE MESSAGES =====================
  // =========================================================
  [BusinessCode.PERMISSION_GET_SUCCESS]: 'Lấy thông tin quyền thành công.',
  [BusinessCode.PERMISSION_CREATED_SUCCESS]: 'Tạo quyền mới thành công.',
  [BusinessCode.PERMISSION_UPDATED_SUCCESS]: 'Cập nhật quyền thành công.',
  [BusinessCode.PERMISSION_DELETED_SUCCESS]: 'Xóa quyền thành công.',
  [BusinessCode.PERMISSION_RESTORED_SUCCESS]: 'Khôi phục quyền thành công.',
  [BusinessCode.PERMISSION_ALREADY_EXISTS]: 'Quyền với API Path và Method này đã tồn tại.',
  [BusinessCode.PERMISSION_NOT_FOUND]: 'Không tìm thấy quyền này.',
};
