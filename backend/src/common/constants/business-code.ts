export enum BusinessCode {
  // =========================================================
  // === SYS: GENERIC / SYSTEM CODES =========================
  // =========================================================

  // --- 0xx: Success ---
  SUCCESS = 'SYS_000',

  // --- 1xx: Client Errors ---
  VALIDATION_FAILED = 'SYS_100', // Lỗi chung cho class-validator
  INVALID_MONGODB_ID = 'SYS_101', // ID không đúng định dạng
  NO_FIELD_UPDATED = 'SYS_102', // Gửi request update nhưng không có gì thay đổi
  EMPTY_UPDATE_DTO = 'SYS_103', // Gửi request update nhưng DTO rỗng

  // --- 2xx: Authentication & Authorization Errors ---
  UNAUTHORIZED = 'SYS_200', // Chưa đăng nhập, thiếu token
  FORBIDDEN = 'SYS_201', // Đã đăng nhập nhưng không có quyền
  REGISTERED = 'SYS_202', // Đăng ký thành công
  LOGIN = 'SYS_203',
  LOGOUT_SUCCESS = 'SYS_204',

  TOKEN_EXPIRED = 'SYS_301',
  INVALID_TOKEN = 'SYS_302',

  GOOGLE_AUTH_FAILED = 'SYS_401',
  EMAIL_NOT_VERIFIED = 'SYS_403',

  ACCOUNT_INFO = 'SYS_205',
  REFRESH_TOKEN_SUCCESS = 'SYS_206',
  RECALLL_TOKEN = 'SYS_207',
  CHANGE_PASSWORD_SUCCESS = 'SYS_208',
  CHANGE_PASSWORD_FAILD = 'SYS_308',

  // --- 5xx: Server Errors ---
  INTERNAL_SERVER_ERROR = 'SYS_500',

  // =========================================================
  // === FILE UPLOAD ====================================
  // =========================================================

  INVALID_FILE_TYPE = 'FIL_400',
  UPLOAD_FILE_SUCCESS = 'FIL_200',
  UPLOAD_FILE_FAILD = 'FIL_500',
  PUBLIC_ID_FILE_NOT_FOUND = 'FIL_404',

  // =========================================================
  // === USR: USER MODULE ====================================
  // =========================================================

  // --- 0xx: Success ---
  USER_GET_SUCCESS = 'USR_000',
  USER_CREATED_SUCCESS = 'USR_001',
  USER_UPDATED_SUCCESS = 'USR_002',
  USER_DELETED_SUCCESS = 'USR_003',

  CANCEL_ACCOUNT_SUCCESS = 'USR_210',
  CANCEL_ACCOUNT_FAILD = 'USR_310',

  ACCOUNT_DELETED = 'USR_320',
  LAST_ACCOUNT_DELETED = 'USR_321',
  ACCOUNT_DISABLED = 'USR_330',

  // --- 1xx: Client Errors ---
  USER_NOT_FOUND = 'USR_100',
  DUPLICATE_USERNAME = 'USR_101',
  DUPLICATE_EMAIL = 'USR_102',

  // =========================================================
  // === PER: PERMISSION MODULE ==============================
  // =========================================================

  // --- 0xx: Success ---
  PERMISSION_GET_SUCCESS = 'PER_000', // Gộp cả get-one và get-all
  PERMISSION_CREATED_SUCCESS = 'PER_001',
  PERMISSION_UPDATED_SUCCESS = 'PER_002',
  PERMISSION_DELETED_SUCCESS = 'PER_003',
  PERMISSION_RESTORED_SUCCESS = 'PER_004',

  // --- 1xx: Client Errors ---
  PERMISSION_ALREADY_EXISTS = 'PER_100', // Trùng lặp apiPath & method
  PERMISSION_NOT_FOUND = 'PER_101',

  // =========================================================
  // === ROL: ROLE MODULE ==============================
  // =========================================================

  // --- 0xx: Success ---
  ROLE_GET_SUCCESS = 'ROLE_000', // Gộp cả get-one và get-all
  ROLE_CREATED_SUCCESS = 'ROL_001',
  ROLE_UPDATED_SUCCESS = 'ROL_002',
  ROLE_DELETED_SUCCESS = 'ROL_003',
  ROLE_RESTORED_SUCCESS = 'ROL_004',

  // --- 1xx: Client Errors ---
  ROLE_ALREADY_EXISTS = 'ROL_100', // Trùng lặp
  ROLE_NOT_FOUND = 'ROL_101',
}
