import ky from 'ky';
import {SERVER_URL} from '@/shared/constants';
import type {LatLngBounds} from 'leaflet';
import type {StarType, SystemData} from '@xoma_star/shared-stellar-goose';
/**
 * сервис для запросов, связанных с галактической картой
 */
export default class GalacticMapService {
  /**
   * получить общие данные о звездных системах в указанных границах
   * @param bounds границы обозреваемой на карте области
   * @returns массив звездных систем. если пустой, значит зум слишком маленький
   */
  static async getChunkPreview(bounds: LatLngBounds): Promise<SystemData<StarType>[]> {
    return ky.get(`${SERVER_URL}/map/chunkPreview`, {
      searchParams: new URLSearchParams({
        left: bounds.getWest().toString(),
        top: bounds.getNorth().toString(),
        right: bounds.getEast().toString(),
        bottom: bounds.getSouth().toString()
      })
    }).json<SystemData<StarType>[]>();
  }
}