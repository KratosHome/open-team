import { existsSync } from 'node:fs';
import { join } from 'node:path';

const envFiles = ['.env.local', '.env'];

for (const envFile of envFiles) {
  const envPath = join(process.cwd(), envFile);

  if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}
