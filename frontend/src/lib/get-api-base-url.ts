import 'server-only';

export function getApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.DEFAULT_API_URL ?? process.env.NEXT_API_DEFAULT_URL ?? 'http://localhost:29465';

  return apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
}
