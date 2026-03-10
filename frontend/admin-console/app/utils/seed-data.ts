import { permissionService } from '~/services/permission.service';
import { roleService } from '~/services/role.service';
import { userService } from '~/services/user.service';
import { toast } from 'sonner';

const DUMMY_PERMISSIONS = [
  { name: 'Xem báo cáo doanh thu', apiPath: '/api/v1/reports/revenue', method: 'GET', module: 'REPORT', isActive: 1 },
  { name: 'Xuất dữ liệu người dùng', apiPath: '/api/v1/users/export', method: 'POST', module: 'USER', isActive: 1 },
  { name: 'Xóa bình luận tiêu cực', apiPath: '/api/v1/comments/:id', method: 'DELETE', module: 'COMMENT', isActive: 1 },
  { name: 'Cấu hình hệ thống', apiPath: '/api/v1/settings', method: 'PATCH', module: 'SETTING', isActive: 1 },
  { name: 'Quản lý phim', apiPath: '/api/v1/movies', method: 'POST', module: 'MOVIE', isActive: 1 },
  { name: 'Xem danh sách phim', apiPath: '/api/v1/movies', method: 'GET', module: 'MOVIE', isActive: 1 },
  { name: 'Cập nhật lịch chiếu', apiPath: '/api/v1/showtimes/:id', method: 'PUT', module: 'SHOWTIME', isActive: 1 },
  { name: 'Quản lý vé', apiPath: '/api/v1/tickets', method: 'GET', module: 'TICKET', isActive: 1 },
];

const DUMMY_ROLES = [
  { name: 'Content Creator', description: 'Chịu trách nhiệm nội dung phim và tin tức', isActive: 1 },
  { name: 'Moderator', description: 'Kiểm soát bình luận và cộng đồng', isActive: 1 },
  { name: 'Accountant', description: 'Quản lý doanh thu và hóa đơn', isActive: 1 },
];

const DUMMY_USERS = [
  { firstName: 'Nguyễn', lastName: 'An', email: 'an.nguyen@example.com', password: 'password123', isActive: 1 },
  { firstName: 'Trần', lastName: 'Bình', email: 'binh.tran@example.com', password: 'password123', isActive: 1 },
  { firstName: 'Lê', lastName: 'Chi', email: 'chi.le@example.com', password: 'password123', isActive: 1 },
  { firstName: 'Phạm', lastName: 'Dũng', email: 'dung.pham@example.com', password: 'password123', isActive: 0 },
  { firstName: 'Hoàng', lastName: 'Yến', email: 'yen.hoang@example.com', password: 'password123', isActive: 1 },
];

export const seedData = async () => {
  const toastId = toast.loading('Đang khởi tạo dữ liệu mẫu...');
  
  try {
    // 1. Seed Permissions
    console.log('--- Seeding Permissions ---');
    for (const p of DUMMY_PERMISSIONS) {
      try {
        const res = await permissionService.createPermission(p);
        console.log(`Permission created: ${p.name}`, res);
      } catch (e: any) {
        console.warn(`Failed to create permission: ${p.name}. Có thể đã tồn tại.`, e?.response?.data || e.message);
      }
    }

    // 2. Seed Roles
    console.log('--- Seeding Roles ---');
    for (const r of DUMMY_ROLES) {
      try {
        const res = await roleService.createRole(r);
        console.log(`Role created: ${r.name}`, res);
      } catch (e: any) {
        console.warn(`Failed to create role: ${r.name}. Có thể đã tồn tại.`, e?.response?.data || e.message);
      }
    }

    // 3. Seed Users
    console.log('--- Seeding Users ---');
    // Lấy danh sách roles vừa tạo hoặc đã có để gán cho user
    const rolesRes = await roleService.getAllRolesWithPagination({ page: 1, limit: 10 });
    const defaultRoleId = rolesRes?.data?.[0]?._id;

    if (!defaultRoleId) {
      throw new Error('Không tìm thấy Role nào để gán cho User. Vui lòng kiểm tra lại backend.');
    }

    for (const u of DUMMY_USERS) {
      try {
        const res = await userService.createUser({ ...u, roleId: defaultRoleId });
        console.log(`User created: ${u.email}`, res);
      } catch (e: any) {
        console.warn(`Failed to create user: ${u.email}. Có thể đã tồn tại.`, e?.response?.data || e.message);
      }
    }

    toast.success('Đổ dữ liệu mẫu hoàn tất (Xem console để biết chi tiết nếu một số mục bị bỏ qua)', { id: toastId });
  } catch (error: any) {
    console.error('Seed error total:', error);
    const errorMsg = error?.response?.data?.message || error.message || 'Lỗi không xác định';
    toast.error(`Lỗi hệ thống: ${errorMsg}`, { id: toastId });
  }
};
