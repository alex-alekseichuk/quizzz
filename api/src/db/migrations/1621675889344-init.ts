import {MigrationInterface, QueryRunner} from "typeorm";

export class init1621675889344 implements MigrationInterface {
    name = 'init1621675889344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "details" text NOT NULL, "courseId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_694aa041ca01a3df5b7c4f2fff2" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`INSERT INTO public.course (title,description) VALUES
            ('Simple Math','There are very simple math questions.'),
            ('JavaScript','There is a set of JavaScript questions.')`);

        await queryRunner.query(`INSERT INTO public.question (title,description,details,"courseId") VALUES
            ('Sum 2 numbers','2 + 3 = ?','{"type":"select","options":["4", "5", "6", "7", "23"],"correct":1}',1),
            ('Divide 2 numbers','5 / 0 = ?','{"type":"select","options":["50", "5", "0", "1", "Division by zero is incorrect"],"correct":4}',1),
            ('What is the value of expression?','"2"'' + "3"','{"type":"select","options":["5", "222", "23", "33"],"correct":2}',2),
            ('What is not JavaScript framework/library?','console.log();','{"type":"select","options":["Ember", "Marionette", "Redux", "Flask", "Meteor"],"correct":3}',2),
            ('Where is JavaScript used?','What kind of application may be built by JavaScript?','{"type":"select","options":["Mobile", "Web Server", "Web Client Application", "TCP/IP Server", "All of them"],"correct":4}',2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_694aa041ca01a3df5b7c4f2fff2"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
