import { fetchData } from '@/shared/service/actions/fetchData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export class ApiService {
  static async get<T>(path: string, cache = false): Promise<T> {
    return await fetchData(`${API_BASE_URL}${path}`, 'GET', null, undefined, cache) as Promise<T>;
  }

  static async post<T>(path: string, body: object): Promise<T> {
    return await fetchData(`${API_BASE_URL}${path}`, 'POST', body) as Promise<T>;
  }

  static async put<T>(path: string, body: object): Promise<T> {
    return await fetchData(`${API_BASE_URL}${path}`, 'PUT', body) as Promise<T>;
  }

  static async delete(path: string): Promise<void> {
    await fetchData(`${API_BASE_URL}${path}`, 'DELETE');
  }
}
