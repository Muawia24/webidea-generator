import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    IdeasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
