import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto, CoursesItemDto } from './dto/courses.dto';

@Controller('api/courses')
export class CoursesController {
	constructor(private coursesService: CoursesService) {}

	@Get()
	async getCourses(): Promise<CoursesItemDto[]> {
		return await this.coursesService.getCourses();
	}

	@Get(':courseId')
	async getCourseDetails(@Param('courseId') courseId: string): Promise<CourseDto> {
		return await this.coursesService.getCourse(+courseId);
	}
}
