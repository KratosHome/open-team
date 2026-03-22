import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { User } from '../users/entities/user.entity';
import { ProjectTeamRole } from '../users/enums/project-team-role.enum';
import { UserRole } from '../users/enums/user-role.enum';

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  projectRoles: ProjectTeamRole[];
};

const TEST_USERS: SeedUser[] = [
  {
    name: 'Oleksii Super Admin',
    email: 'superadmin@openteam.test',
    password: 'SuperAdmin123!',
    role: UserRole.SUPER_ADMIN,
    projectRoles: [
      ProjectTeamRole.PROJECT_CREATOR,
      ProjectTeamRole.PROJECT_OWNER,
    ],
  },
  {
    name: 'Iryna Admin',
    email: 'admin.iryna@openteam.test',
    password: 'AdminIryna123!',
    role: UserRole.ADMIN,
    projectRoles: [ProjectTeamRole.PROJECT_MANAGER],
  },
  {
    name: 'Taras Admin',
    email: 'admin.taras@openteam.test',
    password: 'AdminTaras123!',
    role: UserRole.ADMIN,
    projectRoles: [ProjectTeamRole.BUSINESS_ANALYST],
  },
  {
    name: 'Anna User',
    email: 'anna.user@openteam.test',
    password: 'AnnaUser123!',
    role: UserRole.USER,
    projectRoles: [ProjectTeamRole.DESIGNER],
  },
  {
    name: 'Bohdan User',
    email: 'bohdan.user@openteam.test',
    password: 'BohdanUser123!',
    role: UserRole.USER,
    projectRoles: [ProjectTeamRole.DEVELOPER],
  },
  {
    name: 'Daria User',
    email: 'daria.user@openteam.test',
    password: 'DariaUser123!',
    role: UserRole.USER,
    projectRoles: [ProjectTeamRole.FRONTEND_DEVELOPER],
  },
  {
    name: 'Maksym User',
    email: 'maksym.user@openteam.test',
    password: 'MaksymUser123!',
    role: UserRole.USER,
    projectRoles: [ProjectTeamRole.BACKEND_DEVELOPER],
  },
  {
    name: 'Marta Unverified',
    email: 'marta.unverified@openteam.test',
    password: 'MartaUnverified123!',
    role: UserRole.UNVERIFIED_USER,
    projectRoles: [ProjectTeamRole.QA],
  },
  {
    name: 'Nazar Unverified',
    email: 'nazar.unverified@openteam.test',
    password: 'NazarUnverified123!',
    role: UserRole.UNVERIFIED_USER,
    projectRoles: [ProjectTeamRole.MARKETER],
  },
  {
    name: 'Test Login User',
    email: 'login.test@openteam.test',
    password: 'LoginTest123!',
    role: UserRole.USER,
    projectRoles: [ProjectTeamRole.DEVELOPER, ProjectTeamRole.DESIGNER],
  },
];

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function seedTestUsers(): Promise<void> {
  const logger = new Logger('SeedTestUsers');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const dataSource = app.get(DataSource);
    const result = await dataSource.transaction(async (manager) => {
      const usersRepository = manager.getRepository(User);
      let created = 0;
      let updated = 0;

      for (const testUser of TEST_USERS) {
        const existingUser = await usersRepository.findOne({
          where: { email: testUser.email },
        });
        const hashedPassword = await hashPassword(testUser.password);

        if (existingUser) {
          existingUser.name = testUser.name;
          existingUser.password = hashedPassword;
          existingUser.role = testUser.role;
          existingUser.projectRoles = testUser.projectRoles;

          await usersRepository.save(existingUser);
          updated += 1;
          continue;
        }

        const user = usersRepository.create({
          name: testUser.name,
          email: testUser.email,
          password: hashedPassword,
          role: testUser.role,
          projectRoles: testUser.projectRoles,
        });

        await usersRepository.save(user);
        created += 1;
      }

      return { created, updated };
    });

    logger.log(
      `Test users seed completed. Created: ${result.created}, updated: ${result.updated}.`,
    );
    console.table(
      TEST_USERS.map((user) => ({
        role: user.role,
        projectRoles: user.projectRoles.join(', '),
        email: user.email,
        password: user.password,
      })),
    );
  } finally {
    await app.close();
  }
}

void seedTestUsers().catch((error: unknown) => {
  console.error('Failed to seed test users:', error);
  process.exitCode = 1;
});
