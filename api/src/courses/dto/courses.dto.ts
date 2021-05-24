export class CoursesItemDto {
  id: number;
  title: string;
}

export class CourseDto {
  id: number;
  title: string;
  description: string;
  questions: number[];
}

export class QuestionDto {
  id: number;
  title: string;
  description: string;
  options: string;
}
