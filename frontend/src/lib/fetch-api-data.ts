import 'server-only';

import type { ErrorMessagePayload } from '@/lib/extract-error-message';

import { extractErrorMessage } from '@/lib/extract-error-message';
import { getApiBaseUrl } from '@/lib/get-api-base-url';

export interface FetchApiDataOptions<TData> {
  fallbackErrorMessage: string;
  init?: RequestInit;
  transform?: (payload: unknown) => TData;
}

export interface FetchApiDataResult<TData> {
  data: TData | null;
  errorMessage: string | null;
}

export async function fetchApiData<TData>(
  path: string,
  { fallbackErrorMessage, init, transform }: FetchApiDataOptions<TData>,
): Promise<FetchApiDataResult<TData>> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  try {
    const response = await fetch(`${getApiBaseUrl()}${normalizedPath}`, init);
    const payload = (await response.json().catch(() => null)) as TData | ErrorMessagePayload | null;

    if (!response.ok) {
      console.error(`Failed to fetch API data: ${normalizedPath}`, response.status);

      return {
        data: null,
        errorMessage: extractErrorMessage(
          payload as ErrorMessagePayload | null,
          fallbackErrorMessage,
        ),
      };
    }

    return {
      data: transform ? transform(payload) : ((payload as TData | null) ?? null),
      errorMessage: null,
    };
  } catch (error) {
    console.error(`Error fetching API data: ${normalizedPath}`, error);

    return {
      data: null,
      errorMessage: fallbackErrorMessage,
    };
  }
}
