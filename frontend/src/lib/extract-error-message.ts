export interface ErrorMessagePayload {
  message?: string | string[];
}

export function extractErrorMessage(payload: ErrorMessagePayload | null, fallback: string): string {
  if (!payload?.message) {
    return fallback;
  }

  return Array.isArray(payload.message) ? payload.message.join(', ') : payload.message;
}
