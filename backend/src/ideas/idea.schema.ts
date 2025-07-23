import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IdeaDocument = Idea & Document;

@Schema()
export class Idea {
  @Prop({ required: true })
  idea: string;

  @Prop({ type: [String], required: true })
  sections: string[];
}

export const IdeaSchema = SchemaFactory.createForClass(Idea); 