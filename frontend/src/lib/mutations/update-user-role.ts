'use server';

import type { ErrorMessagePayload } from '@/lib/extract-error-message';

import { extractErrorMessage } from '@/lib/extract-error-message';
import { getApiBaseUrl } from '@/lib/get-api-base-url';
import { User, UserRole } from '@/types/user';

export async function updateUserRole(userId: number, role: UserRole): Promise<User> {
  const response = await fetch(`${getApiBaseUrl()}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ role }),
    cache: 'no-store',
  });
  const payload = (await response.json().catch(() => null)) as User | ErrorMessagePayload | null;

  if (!response.ok) {
    throw new Error(
      extractErrorMessage(payload as ErrorMessagePayload | null, 'Failed to update user role.'),
    );
  }

  return payload as User;
}
