import ky, {KyResponse} from 'ky';
import {SERVER_URL} from '@/shared/constants';

export default class GalacticMapService {
  static async getChunkPreview(topLeft: [number, number], rightBottom: [number, number]): Promise<KyResponse> {
    return ky.get(`${SERVER_URL}/map/chunkPreview`, {searchParams: new URLSearchParams({bounds: [topLeft, rightBottom]})});
  }
}