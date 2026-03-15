import mongoose, { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ActiveStatus } from '@common/constants/common-constant';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class Cast extends BaseSchema{
  @Prop()
  fullName: string;

  @Prop()
  gender: number; // 0: Male, 1: Female, 3: Other

  @Prop()
  popularity: number;

  @Prop({ type: Object })
  profilePath: {
    url?: string;
    publicId?: string;
    folder?: string;
  };
}

export type CastDocument = HydratedDocument<Cast>;
export const CastSchema = SchemaFactory.createForClass(Cast);
