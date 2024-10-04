import ky from 'ky';
import {SERVER_URL} from '@/shared/constants';
import type DemoService from '@/demo/service';

type UnknownRecord = Record<string, unknown>;

async function withDemoCheck<T>(
  request: (method: string, data: UnknownRecord) => Promise<T>,
  ...args: unknown[]
): Promise<T> {
  if (this.isDemo) {
    const demoService = await this.getDemoService();
    return demoService.call<T>(this.collection, ...args);
  }
  return request(...args);
}

/**
 * сервис для запросов к серверу
 */
export default class ApiService {
  protected collection: string;
  protected isDemo: boolean;
  protected demoService: DemoService | undefined;

  constructor(collection: string) {
    this.collection = collection;
    this.isDemo = import.meta.env.DEV;
  }

  /**
   * выполнить GET запрос на сервер
   * @param method название метода
   * @param data payload для метода
   */
  async get<T extends UnknownRecord>(method: string, data: UnknownRecord): Promise<T> {
    const getRequest = (method: string, data: UnknownRecord) => ky
      .get(`${SERVER_URL}/${this.collection}/${method}`, {searchParams: new URLSearchParams(data)})
      .json<T>();

    return withDemoCheck.call<T>(this, getRequest, method, data);
  }

  /**
   * выполнить POST запрос на сервер
   * @param method название метода
   * @param data payload для метода
   */
  async post<T extends UnknownRecord>(method: string, data: Record<string, unknown>): Promise<T> {
    return ky
      .post(`${SERVER_URL}/${this.collection}/${method}`, {body: JSON.stringify(data)})
      .json<T>();
  }

  /**
   * импортировать сервис с моками
   * @protected
   */
  protected async getDemoService() {
    if (!this.demoService) {
      this.demoService = (await import('@/demo/service')).default;
    }

    return this.demoService;
  }
}