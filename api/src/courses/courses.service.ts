import { Injectable } from '@nestjs/common';
import { Course } from './entity/Course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/Question.entity';
import { CourseDto, CoursesItemDto, QuestionDto } from './dto/courses.dto';

@Injectable()
export class CoursesService {
	constructor(
		@InjectRepository(Course) private coursesRepository: Repository<Course>,
		@InjectRepository(Question) private questionsRepository: Repository<Question>,
	) {}

	async getCourses(): Promise<CoursesItemDto[]> {
		const courses = (await this.coursesRepository.find()).map(course => ({
			id: course.id,
			title: course.title
		}));
		console.log(courses);
		return courses;
	}

	async getCourse(courseId: number): Promise<CourseDto> {
		const course = await this.coursesRepository.findOne({id: courseId});
		const questions = await this.questionsRepository
			.createQueryBuilder('question')
			.where(`question.courseId = ${course.id}`)
			.select('question.id')
			.getMany();
		return {
			id: course.id,
			title: course.title,
			description: course.description,
			questions: questions.map(question => question.id)
		};
	}

	async getQuestion(questionId: number): Promise<QuestionDto> {
		const question = await this.questionsRepository.findOne({id: questionId});
		const details = deserializeQuestionDetails(question.details);
		if (details)
			return {
				id: question.id,
				title: question.title,
				description: question.description,
				options: details.getOptions()
			};
	}

	async answerQuestion(questionId: number, answer: any): Promise<boolean> {
		const question = await this.questionsRepository.findOne({id: questionId});

		const details = deserializeQuestionDetails(question.details);
		if (details)
			return details.check(answer)
	}

}

function deserializeQuestionDetails(details: string): IQuestionDetails {
	try {
		const detailsObj: any = JSON.parse(details);
		return new SelectQuestionDetails(detailsObj.options, detailsObj.correct);
	} catch (err) {
		return null;
	}
}

interface IQuestionDetails {
	check(answer: any): boolean;
	getOptions(): any;
}

class SelectQuestionDetails implements IQuestionDetails {
	constructor(private items: string[], private correctIndex: number) {}
	check(answer: any): boolean {
		return answer.index === this.correctIndex;
	}
	getOptions(): any {
		return {items: this.items};
	}
}
