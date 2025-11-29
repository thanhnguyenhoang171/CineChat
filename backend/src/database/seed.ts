// src/seed.ts
import { NestFactory } from '@nestjs/core';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { User } from '@modules/users/schemas/user.schema';
import { Role } from '@modules/roles/schemas/role.schema';

import { PERMISSIONS_DATA, ROLES_DATA, USERS_DATA } from '@database/mock-data';
import { Permission } from '@modules/permissions/schemas/permission.schema'; // Cần cài: npm i bcrypt @types/bcrypt


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // 1. Lấy các Models
    const userModel = app.get<Model<User>>(getModelToken(User.name));
    const roleModel = app.get<Model<Role>>(getModelToken(Role.name));
    const permissionModel = app.get<Model<Permission>>(getModelToken(Permission.name));

    console.log('🧹 Clearing old data...');
    await userModel.deleteMany({});
    await roleModel.deleteMany({});
    await permissionModel.deleteMany({});

    // ---------------------------------------------------------
    // 2. SEED PERMISSIONS
    // ---------------------------------------------------------
    console.log('🌱 Seeding Permissions...');
    // Insert và nhận lại kết quả để lấy _id
    const createdPermissions = await permissionModel.insertMany(PERMISSIONS_DATA);
    console.log(`   - Created ${createdPermissions.length} permissions`);

    // Tạo map để dễ lấy permission id (Optional)
    const allPermissionIds = createdPermissions.map(p => p._id);

    // ---------------------------------------------------------
    // 3. SEED ROLES (Gán Permissions vào Role)
    // ---------------------------------------------------------
    console.log('🌱 Seeding Roles...');

    // Tạo Role ADMIN (Lấy tất cả quyền)
    const adminRoleData = ROLES_DATA.find(r => r.name === 'ADMIN');
    const adminRole = await roleModel.create({
      ...adminRoleData,
      permissions: allPermissionIds // Gán mảng ID permissions vào đây
    });

    // Tạo Role USER (Chỉ lấy quyền Login và Get Users ví dụ)
    // Lọc ra permission id tương ứng
    const userPermissions = createdPermissions
      .filter(p => ['Login', 'Get All Users'].includes(p.name))
      .map(p => p._id);

    const userRoleData = ROLES_DATA.find(r => r.name === 'USER');
    const userRole = await roleModel.create({
      ...userRoleData,
      permissions: userPermissions
    });

    console.log(`   - Created Roles: ADMIN (${adminRole._id}), USER (${userRole._id})`);

    // ---------------------------------------------------------
    // 4. SEED USERS (Gán Role vào User & Hash Password)
    // ---------------------------------------------------------
    console.log('🌱 Seeding Users...');

    // Hash password chung cho nhanh (hoặc hash từng user nếu pass khác nhau)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const usersToInsert = USERS_DATA.map(user => {
      // Logic gán Role: Nếu username là admin thì gán role Admin, còn lại User
      const assignedRole = user.username === 'admin' ? adminRole._id : userRole._id;

      return {
        ...user,
        password: hashedPassword, // Lưu password đã hash
        role: assignedRole        // Gán Role ID vào user
      };
    });

    await userModel.insertMany(usersToInsert);
    console.log(`   - Created ${usersToInsert.length} users`);

    console.log('✅ Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();