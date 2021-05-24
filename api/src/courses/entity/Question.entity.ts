import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, RelationId } from 'typeorm';
import { Course } from './Course.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("text")
  details: string;

  @ManyToOne(type => Course, course => course.questions)
  course: Course;

  @RelationId((question: Question) => question.course)
  courseId: number;
}
