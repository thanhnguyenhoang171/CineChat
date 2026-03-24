import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permission } from '@modules/permissions/schemas/permission.schema';
import { ActiveStatus } from '@common/constants/common-constant';
import { BaseSchema } from '@common/schemas/base.schema';
export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role extends BaseSchema{
  @Prop({ required: true, unique: true, trim: true, uppercase: true })
  name: string;

  @Prop()
  level: number;

  @Prop()
  description: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Permission.name })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
