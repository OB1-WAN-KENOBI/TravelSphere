import { ApiError, NetworkError, ParseError, TimeoutError } from './errors';

const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Выполняет HTTP запрос с таймаутом
 * @param url - URL для запроса
 * @param timeout - Таймаут в миллисекундах
 * @returns Promise с Response
 */

interface FetchJsonOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError(`Request to ${url} timed out after ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Выполняет GET запрос и парсит JSON ответ
 * @param path - Путь к ресурсу
 * @param options - Опции запроса (timeout, retries, retryDelay)
 * @returns Promise с данными типа T
 * @throws {ApiError} При ошибках HTTP (4xx, 5xx)
 * @throws {NetworkError} При сетевых ошибках
 * @throws {ParseError} При ошибках парсинга JSON
 * @throws {TimeoutError} При превышении таймаута
 */
export async function fetchJson<T>(
  path: string,
  options: FetchJsonOptions = {}
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, retries = 0, retryDelay = 1000 } = options;
  const isAbsolute = /^https?:\/\//i.test(path);
  const resolvedPath = isAbsolute
    ? path
    : path.startsWith('/')
    ? path
    : `/${path}`;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(resolvedPath, timeout);

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch ${resolvedPath}: ${response.status}`,
          response.status,
          resolvedPath
        );
      }

      try {
        const data = await response.json();
        return data as T;
      } catch (parseError) {
        throw new ParseError(
          `Failed to parse JSON from ${resolvedPath}`,
          parseError
        );
      }
    } catch (error) {
      lastError = error as Error;

      // Не повторяем для определенных типов ошибок
      if (
        error instanceof ApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        throw error;
      }

      // Если это последняя попытка, выбрасываем ошибку
      if (attempt === retries) {
        if (error instanceof ApiError || error instanceof ParseError) {
          throw error;
        }
        throw new NetworkError(`Network error while fetching ${path}`, error);
      }

      // Ждем перед повторной попыткой
      await delay(retryDelay * (attempt + 1));
    }
  }

  throw lastError!;
}
