'use server';

import { getApiBaseUrl } from '@/lib/get-api-base-url';
import { User, UserRole } from '@/types/user';

type ErrorResponse = {
  message?: string | string[];
};

function extractErrorMessage(payload: ErrorResponse | null, fallback: string): string {
  if (!payload?.message) {
    return fallback;
  }

  return Array.isArray(payload.message) ? payload.message.join(', ') : payload.message;
}

export async function updateUserRole(userId: number, role: UserRole): Promise<User> {
  const response = await fetch(`${getApiBaseUrl()}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ role }),
    cache: 'no-store',
  });
  const payload = (await response.json().catch(() => null)) as User | ErrorResponse | null;

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload as ErrorResponse | null, 'Failed to update user role.'),
    );
  }

  return payload as User;
}
