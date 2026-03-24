import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ActiveStatus } from '@common/constants/common-constant';

@Schema({ _id: false })
export class UserMeta {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  username?: string;

  @Prop()
  email?: string;
}

@Schema()
export abstract class BaseSchema {
  @Prop({
    type: Number,
    enum: ActiveStatus,
    default: ActiveStatus.ACTIVE,
  })
  isActive: ActiveStatus;

  @Prop({ type: UserMeta, default: null })
  createdBy: UserMeta;

  @Prop({ type: UserMeta, default: null })
  updatedBy: UserMeta;

  @Prop({ type: UserMeta, default: null })
  deletedBy: UserMeta;

  @Prop({ default: false, index: true })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
