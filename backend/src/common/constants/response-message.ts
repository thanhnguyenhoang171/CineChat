import { BusinessCode } from "./business-code";


export const ResponseMessage: Record<BusinessCode, string> = {
  [BusinessCode.USER_CREATED]: 'Tạo người dùng thành công',
  [BusinessCode.DUPLICATE_USERNAME]: 'Tên người dùng đã tồn tại',
  [BusinessCode.DUPLICATE_EMAIL]: 'Email đã tồn tại',
  [BusinessCode.USER_NOT_FOUND]: 'Không tìm thấy người dùng',
  [BusinessCode.INTERNAL_ERROR]: 'Lỗi hệ thống, vui lòng thử lại sau',
  [BusinessCode.SUCCESS]: 'Lấy dữ liệu thành công',
  [BusinessCode.USER_UPDATED]: 'Cập nhật người dùng thành công',
  [BusinessCode.USER_DELETED]: 'Xóa người dùng thành công',

  [BusinessCode.INVALID_MONGODB_ID]: 'ID không hợp lệ',
  [BusinessCode.NO_FIELD_UPDATED]:
    'Không có dữ liệu nào được cập nhật (field sai hoặc trùng dữ liệu cũ)',
  [BusinessCode.INVALID_FIELD]: 'Trường không hợp lệ trong schema',
  [BusinessCode.VALIDATION_FAILED]: 'Dữ liệu không hợp lệ',
};
