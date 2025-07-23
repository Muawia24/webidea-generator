import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { Idea, IdeaSchema } from './idea.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }])],
  providers: [IdeasService],
  controllers: [IdeasController]
})
export class IdeasModule {}
