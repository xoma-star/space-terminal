import ky, {KyResponse} from 'ky';
import {SERVER_URL} from '@/shared/constants';
import type {LatLngBounds} from 'leaflet';

/**
 * сервис для запросов, связанных с галактической картой
 */
export default class GalacticMapService {
  /**
   * получить общие данные о звездных системах в указанных границах
   * @param bounds границы обозреваемой на карте области
   * @returns массив звездных систем. если пустой, значит зум слишком маленький
   */
  static async getChunkPreview(bounds: LatLngBounds): Promise<KyResponse> {
    return ky.get(`${SERVER_URL}/map/chunkPreview`, {
      searchParams: new URLSearchParams({
        left: bounds.getWest(),
        top: bounds.getNorth(),
        right: bounds.getEast(),
        bottom: bounds.getSouth()
      })
    }).json();
  }
}