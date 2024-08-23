import {useCallback, useEffect, useState} from 'react';
import type {LatLngBounds} from 'leaflet';
import {useMap, useMapEvents} from 'react-leaflet';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from '../api/GalacticMapService';
import type {StarType, SystemData} from '@xoma_star/shared-stellar-goose';
import useWindows from '@/shared/lib/useWindows';

const MAX_ZOOM = 18;
const MAX_STARS_STORED = 200;
/** начиная с какой разницы в зуме не подгружать новые звезды */
const MAX_DIFF_WHEN_HIDE = 4;

export default function useGalacticMap() {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [markers, setMarkers] = useState<SystemData<StarType>[]>([]);
  const {showError, openWindow} = useWindows();
  const map = useMap();

  const zoom = map.getZoom();

  useEffect(() => {
    setBounds(map.getBounds());
  }, []);

  const zoomDiff = MAX_ZOOM - zoom;

  useQuery({
    queryKey: [bounds, zoom],
    queryFn: () => {
      if (bounds && zoom > MAX_ZOOM - MAX_DIFF_WHEN_HIDE) {
        GalacticMapService
          .getChunkPreview(bounds)
          .then((data) => {
            setMarkers((prevState) => {
              const newState = [...prevState];
              for (const star of data) {
                if (newState.findIndex((x) => x.id === star.id) < 0) {
                  if (newState.length > MAX_STARS_STORED) {
                    newState.shift();
                  }
                  newState.push(star);
                }
              }
              return newState;
            });

            return data;
          })
          .catch(e => {
            showError(e);
            return [];
          });
      }

      return [];
    }
  });

  useMapEvents({
    moveend(){
      setBounds(map.getBounds());
    }
  });

  const shouldDisplayStar = useCallback((marker: SystemData<StarType>) => {
    const multiple = parseInt(marker.id.slice(-8), 16);

    if (zoomDiff > MAX_DIFF_WHEN_HIDE) {
      if (multiple % 2 !== 0 || multiple % 3 !== 0 || multiple % 5 !== 0) {
        return false;
      }
    }
    if (zoomDiff > MAX_DIFF_WHEN_HIDE - 1) {
      if (multiple % 2 !== 0 || multiple % 3 !== 0) {
        return false;
      }
    }
    if (zoomDiff > MAX_DIFF_WHEN_HIDE - 2) {
      if (multiple % 2 !== 0) {
        return false;
      }
    }

    return true;
  }, [zoomDiff]);

  return {
    markers: zoomDiff < 5 ? markers : [] as SystemData<StarType>[],
    shouldDisplayStar,
    openWindow
  };
}