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
  [BusinessCode.REGISTERED]: 'Đăng ký tài khoản mới thành công!',
  [BusinessCode.LOGIN]: 'Đăng nhập thành công!',
  [BusinessCode.TOKEN_EXPIRED]: 'Token đã hết hạn!',
  [BusinessCode.INVALID_TOKEN]: 'Token không hợp lệ!',
  [BusinessCode.LOGOUT_SUCCESS]: 'Đăng xuất thành công!',
  [BusinessCode.FORBIDDEN]: 'Bạn không có quyền thực hiện hành động này.',
  [BusinessCode.INTERNAL_SERVER_ERROR]: 'Lỗi hệ thống, vui lòng thử lại sau.',
  [BusinessCode.EMPTY_UPDATE_DTO]: 'Không có dữ liệu nào để cập nhật.',
  [BusinessCode.ACCOUNT_INFO]: 'Lấy thông tin tài khoản thành công.',
  [BusinessCode.REFRESH_TOKEN_SUCCESS]: 'Refresh tài khoản thành công.',
  [BusinessCode.RECALLL_TOKEN]: 'Tài khoản đã được thu hồi. Vui lòng đăng nhập lại.',
  [BusinessCode.CHANGE_PASSWORD_SUCCESS]: 'Đổi mật khẩu thành công!',
  [BusinessCode.CHANGE_PASSWORD_FAILD]: 'Đổi mật khẩu thất bại!',
  [BusinessCode.GOOGLE_AUTH_FAILED]:
    'Xác thực Google thất bại. Thông tin người dùng bị thiếu hoặc không hợp lệ.',
  [BusinessCode.EMAIL_NOT_VERIFIED]:
    'Vui lòng xác nhận địa chỉ email Google của bạn trước khi đăng nhập.',

  // =========================================================
  // === FILE UPLOAD===========================
  // =========================================================
  [BusinessCode.INVALID_FILE_TYPE]: 'Loại tệp không hợp lệ. Vui lòng tải lên tệp hình ảnh.',
  [BusinessCode.UPLOAD_FILE_SUCCESS]: 'Upload file thành công!',
  [BusinessCode.PUBLIC_ID_FILE_NOT_FOUND]: 'Public Id của file không tồn tại!',
  [BusinessCode.UPLOAD_FILE_FAILD]: 'Upload file thất bại!',

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

  [BusinessCode.CANCEL_ACCOUNT_SUCCESS]: 'Hủy tài khoản thành công!',
  [BusinessCode.CANCEL_ACCOUNT_FAILD]: 'Hủy tài khoản thất bại!',

  [BusinessCode.ACCOUNT_DELETED]: 'Tài khoản đã bị xóa khỏi hệ thống',
  [BusinessCode.LAST_ACCOUNT_DELETED]: 'Không thể xóa tài khoản admin cuối cùng trong hệ thống',
  [BusinessCode.ACCOUNT_DISABLED]: 'Tài khoản không hoạt động',

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

  //=========================================================
  // === ROL: ROLE MODULE MESSAGES =====================
  // =========================================================
  [BusinessCode.ROLE_GET_SUCCESS]: 'Lấy thông tin vai trò thành công.',
  [BusinessCode.ROLE_CREATED_SUCCESS]: 'Tạo vai trò mới thành công.',
  [BusinessCode.ROLE_UPDATED_SUCCESS]: 'Cập nhật vai trò thành công.',
  [BusinessCode.ROLE_DELETED_SUCCESS]: 'Xóa vai trò thành công.',
  [BusinessCode.ROLE_RESTORED_SUCCESS]: 'Khôi phục vai trò thành công.',
  [BusinessCode.ROLE_ALREADY_EXISTS]: 'Vai trò này đã tồn tại.',
  [BusinessCode.ROLE_NOT_FOUND]: 'Không tìm thấy vai trò này.',
};
