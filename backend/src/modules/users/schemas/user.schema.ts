import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@modules/roles/schemas/role.schema';
import { ActiveStatus, LoginProvider } from '@common/constants/common-constant';
import { BaseSchema } from '@common/schemas/base.schema';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema{
  @Prop()
  firstName?: string;
  @Prop()
  lastName?: string;

  @Prop({ type: Object })
  picture?: {
    url?: string;
    public_id?: string;
    folder?: string;
  };

  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    enum: LoginProvider,
  })
  provider: string;

  @Prop()
  googleId?: string;

  @Prop()
  emailVerified?: boolean;

  @Prop({ type: String, default: null })
  refreshToken: string | null;

  @Prop({ type: Number, default: 0 })
  tokenVersion: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
