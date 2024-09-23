import type {LatLngBounds} from 'leaflet';
import type {StarType, SystemData} from '@xoma_star/shared-stellar-goose';
import ApiService from '@/shared/ApiService';
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
    const service = new ApiService('map');
    return service.get<SystemData<StarType>[]>('chunkPreview', {
      left: bounds.getWest().toString(),
      top: bounds.getNorth().toString(),
      right: bounds.getEast().toString(),
      bottom: bounds.getSouth().toString()
    });
  }
}