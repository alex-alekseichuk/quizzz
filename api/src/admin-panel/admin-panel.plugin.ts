import { INestApplication } from '@nestjs/common';
import { Database, Resource } from '@admin-bro/typeorm';

import AdminBro from 'admin-bro';

import * as AdminBroExpress from 'admin-bro-expressjs';
import { validate } from 'class-validator'
import { Question } from '../courses/entity/Question.entity';
import { Course } from '../courses/entity/Course.entity';

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  Resource.validate = validate;
  AdminBro.registerAdapter({ Database, Resource });

  const coursesNavigation = {
    name: 'courses',
    icon: 'Education',
  };

  const adminBro = new AdminBro({
    resources: [
      {
        resource: Course, options: {
          navigation: coursesNavigation,
          properties: {
            description: { type: 'textarea' },
          }
        },
      },
      {
        resource: Question, options: {
          navigation: coursesNavigation,
          properties: {
            description: { type: 'textarea' },
            details: { type: 'textarea' },
          }
        }
      }
    ],
    rootPath: '/admin',
    branding: {
      logo: false,
      companyName: 'Quizzz',
      softwareBrothers: false
    },
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
}
