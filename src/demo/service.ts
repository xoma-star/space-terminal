import {StarType} from '@xoma_star/shared-stellar-goose';

export default class DemoService {
  static async call<T>(args): Promise<T> {
    console.log(args)
    return [];
  }

  protected static getChunkPreview(): StarType[] {
    return [];
  }
}