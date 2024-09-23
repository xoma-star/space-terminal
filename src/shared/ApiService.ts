import ky from 'ky';
import {SERVER_URL} from '@/shared/constants';

type UnknownRecord = Record<string, unknown>;

/**
 * сервис для запросов к серверу
 */
export default class ApiService {
  protected readonly collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  /**
   * выполнить GET запрос на сервер
   * @param method название метода
   * @param data payload для метода
   */
  get<T extends UnknownRecord>(method: string, data: UnknownRecord): Promise<T> {
    return ky
      .get(`${SERVER_URL}/${this.collection}/${method}`, {searchParams: new URLSearchParams(data)})
      .json<T>();
  }

  /**
   * выполнить POST запрос на сервер
   * @param method название метода
   * @param data payload для метода
   */
  post<T extends UnknownRecord>(method: string, data: Record<string, unknown>): Promise<T> {
    return ky
      .post(`${SERVER_URL}/${this.collection}/${method}`, {body: JSON.stringify(data)})
      .json<T>();
  }
}