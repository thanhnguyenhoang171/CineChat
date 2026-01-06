import { NestFactory } from '@nestjs/core';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { User } from '@modules/users/schemas/user.schema';
import { Role } from '@modules/roles/schemas/role.schema';

import { PERMISSIONS_DATA, ROLES_DATA, USERS_DATA } from '@database/mock-data';
import { Permission } from '@modules/permissions/schemas/permission.schema';
import { passwordHashing } from '@common/utils/password-bcrypt.util';
import { RoleLevel } from '@common/constants/common-constant';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const userModel = app.get<Model<User>>(getModelToken(User.name));
    const roleModel = app.get<Model<Role>>(getModelToken(Role.name));
    const permissionModel = app.get<Model<Permission>>(getModelToken(Permission.name));

    // Cleaning old data
    await userModel.deleteMany({});
    await roleModel.deleteMany({});
    await permissionModel.deleteMany({});

    // Step 1: Seed Permissions

    console.log('Seeding Permissions');
    const createdPermissions = await permissionModel.insertMany(PERMISSIONS_DATA);
    console.log(`   - Created ${createdPermissions.length} permissions`);

    // Create map to get Permission Id
    const allPermissionIds = createdPermissions.map(p => p._id);

    // Step 2: Seed Roles and assign Permissions
    console.log('Seeding Roles');

    // Create ADMIN Role (full permissions)
    const adminRoleData = ROLES_DATA.find(r => r.level === RoleLevel.ADMIN);
    const adminRole = await roleModel.create({
      ...adminRoleData,
      permissions: allPermissionIds
    });

    // Create USER Role
    // Lọc ra permission id tương ứng
    // const userPermissions = createdPermissions
    //   .filter(p => ['Login', 'Get All Users'].includes(p.name))
    //   .map(p => p._id);

    const userRoleData = ROLES_DATA.find(r => r.level === RoleLevel.USER);
    const userRole = await roleModel.create({
      ...userRoleData,
      // permissions: userPermissions
    });

    // Create MANAGER Role
    const managerPermissions = createdPermissions
      .filter(p => ['Tạo mới một người dùng', 'Lấy tất cả người dùng có phân trang', 'Cập nhật một người dùng bằng id', 'Xóa một người dùng bằng id'].includes(p.name))
      .map(p => p._id);

    const managerRoleData = ROLES_DATA.find(r => r.level === RoleLevel.MANAGER);
    const managerRole = await roleModel.create({
      ...managerRoleData,
      permissions: managerPermissions
    });

    console.log(`   - Created Roles: ADMIN (${adminRole._id}), MANAGER (${managerRole._id}), USER (${userRole._id})`);

    // Step 3: Seeding USER
    console.log('Seeding Users');

    const hashedPassword = await passwordHashing('@Thanh171');

    const usersToInsert = USERS_DATA.map(user => {
      const assignedRole =
        user.username === 'admincinechat'
          ? adminRole._id
          : user.username === 'managercinechat'
            ? managerRole._id
            : userRole._id;

      return {
        ...user,
        password: hashedPassword,
        role: assignedRole
      };
    });

    await userModel.insertMany(usersToInsert);
    console.log(`   - Created ${usersToInsert.length} users`);

    console.log('Seeding completed successfully!');

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();