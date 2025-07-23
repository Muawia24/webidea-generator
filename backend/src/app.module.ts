import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://amuawia666:mongodb@cluster0.csit0.mongodb.net/'),
    IdeasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
