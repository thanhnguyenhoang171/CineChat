import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@modules/roles/schemas/role.schema';
import { Gender, LoginProvider } from '@common/constants/common-constant';
import { BaseSchema } from '@common/schemas/base.schema';
import { Movie } from '@modules/movies/schemas/movie.schema';
import { Genre } from '@modules/movies/schemas/genre.schema';
import { SubscriptionPlan } from '@modules/subscriptions/schemas/subscription-plan.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ trim: true })
  firstName?: string;

  @Prop({ trim: true })
  lastName?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ trim: true })
  phoneNumber?: string;

  @Prop({ trim: true })
  bio?: string;

  @Prop({
    type: Number,
    enum: Gender,
  })
  gender: number;

  @Prop({ type: Object })
  picture?: {
    url?: string;
    publicId?: string;
    folder?: string;
  };

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  username: string;

  @Prop({
    select: false,
    required: function (this: User) {
      return this.provider === LoginProvider.USERNAME;
    },
  })
  password?: string;

  @Prop({
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Role.name,
    required: true,
  })
  role: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Number,
    enum: LoginProvider,
  })
  provider: number;

  @Prop()
  googleId?: string;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: String, default: null })
  refreshToken: string | null;

  @Prop({ type: Number, default: 0 })
  tokenVersion: number;

  @Prop({ type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ trim: true })
  banReason?: string;

  @Prop()
  lastLogin?: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Movie.name }] })
  watchlist: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: Genre.name }] })
  favoriteGenres: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: SubscriptionPlan.name, default: null })
  activeSubscription?: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
