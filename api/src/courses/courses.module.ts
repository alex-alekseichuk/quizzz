import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Question } from './entity/Question.entity';
import { Course } from './entity/Course.entity';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Question])],
  controllers: [CoursesController, QuestionsController],
  providers: [CoursesService]
})
export class CoursesModule {}
