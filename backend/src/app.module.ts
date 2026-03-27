import './config/load-env';
import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];

    if (value !== undefined && value !== '') {
      return value;
    }
  }

  return undefined;
}

function readBooleanEnv(...keys: string[]): boolean {
  const value = readEnv(...keys)?.toLowerCase();

  return value === 'true' || value === '1' || value === 'yes';
}

function getDatabaseConfig(): TypeOrmModuleOptions {
  if (process.env.NODE_ENV === 'test' || readBooleanEnv('USE_IN_MEMORY_DB')) {
    return {
      type: 'sqljs',
      autoLoadEntities: true,
      synchronize: true,
      autoSave: false,
    };
  }

  const databaseUrl = readEnv('DATABASE_URL', 'DB_URL');
  const databasePort = Number.parseInt(
    readEnv('DATABASE_PORT', 'DB_PORT') ?? '5432',
    10,
  );
  const databaseSslEnabled = readEnv('DATABASE_SSL', 'DB_SSL') === 'true';

  return {
    type: 'postgres',
    ...(databaseUrl
      ? { url: databaseUrl }
      : {
          // Accept both the documented DATABASE_* keys and legacy DB_* aliases.
          host: readEnv('DATABASE_HOST', 'DB_HOST') ?? 'localhost',
          port: Number.isNaN(databasePort) ? 5432 : databasePort,
          username:
            readEnv('DATABASE_USER', 'DB_USERNAME', 'DB_USER') ?? 'postgres',
          password: readEnv('DATABASE_PASSWORD', 'DB_PASSWORD') ?? 'postgres',
          database: readEnv('DATABASE_NAME', 'DB_NAME') ?? 'openteam',
        }),
    ssl: databaseSslEnabled ? { rejectUnauthorized: false } : false,
    autoLoadEntities: true,
    synchronize: true,
    retryAttempts: 0,
  };
}

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseConfig()), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
