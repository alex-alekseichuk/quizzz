import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Question } from './Question.entity';

@Entity()
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
 	title: string;

  @Column("text")
  description: string;

  @OneToMany(type => Question, question => question.course)
  questions: Question[];
}
