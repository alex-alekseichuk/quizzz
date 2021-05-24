import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { QuestionDto } from './dto/courses.dto';

@Controller('api/questions')
export class QuestionsController {
	constructor(private coursesService: CoursesService) {}

	@Get(':questionId')
	async getQuestion(
		@Param('questionId') questionId: string,
	): Promise<QuestionDto> {
		return await this.coursesService.getQuestion(+questionId);
	}

	@Post(':questionId/answer')
	async answerQuestion(
		@Param('questionId') questionId: string,
		@Body() answer: any
	): Promise<boolean> {
		return await this.coursesService.answerQuestion(+questionId, answer);
	}
}
