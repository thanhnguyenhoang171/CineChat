import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ActiveStatus } from '@common/constants/common-constant';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class Permission extends BaseSchema{
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  apiPath: string;

  @Prop({ required: true, trim: true, uppercase: true })
  method: string;

  @Prop({ required: true, trim: true })
  module: string;
}
export type PermissionDocument = HydratedDocument<Permission>;

export const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.index({ apiPath: 1, method: 1 }, { unique: true });
