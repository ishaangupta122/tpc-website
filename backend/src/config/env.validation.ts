// Fails fast at startup with a clear message instead of running half-configured.
export const validateEnv = (env: Record<string, unknown>) => {
  const errors: string[] = [];
  const text = (key: string) => String(env[key] ?? '').trim();
  const production = text('NODE_ENV') === 'production';

  if (!text('MONGO_URI')) errors.push('MONGO_URI is required');

  const secret = text('JWT_SECRET');
  if (secret.length < 32) {
    errors.push('JWT_SECRET is required and must be at least 32 characters');
  }

  if (text('ADMIN_PASSWORD') && text('ADMIN_PASSWORD').length < 12) {
    errors.push('ADMIN_PASSWORD must be at least 12 characters');
  }
  if (text('ADMIN_PASSWORD') && !text('ADMIN_EMAIL')) {
    errors.push('ADMIN_EMAIL is required when ADMIN_PASSWORD is set');
  }

  if (production) {
    if (!text('BASE_URL')) errors.push('BASE_URL is required in production');
    if (!text('CORS_ORIGINS')) {
      errors.push('CORS_ORIGINS is required in production (comma-separated site and admin URLs)');
    }
  }

  if (errors.length) {
    throw new Error(`Invalid environment:\n - ${errors.join('\n - ')}`);
  }
  return env;
};
