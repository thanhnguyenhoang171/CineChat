import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schemas/base.schema';

@Schema({ timestamps: true })
export class Banner extends BaseSchema {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  linkUrl: string;

  @Prop({ default: 0 })
  order: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
BannerSchema.index({ startDate: 1, endDate: 1, isActive: 1 });
