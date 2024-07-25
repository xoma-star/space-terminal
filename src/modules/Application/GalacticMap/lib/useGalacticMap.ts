import {useCallback, useEffect, useState} from 'react';
import type {LatLngBounds} from 'leaflet';
import {useMap, useMapEvents} from 'react-leaflet';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from '../api/GalacticMapService';
import type {SystemData} from '@xoma_star/shared-stellar-goose';
import useWindows from '@/shared/lib/useWindows';

const MAX_ZOOM = 18;

export default function useGalacticMap() {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [markers, setMarkers] = useState<SystemData[]>([]);
  const {showError} = useWindows();
  const map = useMap();

  const zoom = map.getZoom();

  useEffect(() => {
    setBounds(map.getBounds());
  }, []);

  const zoomDiff = MAX_ZOOM - zoom;

  useQuery({
    queryKey: [bounds, zoom],
    queryFn: () => {
      if (bounds && zoom > MAX_ZOOM - 2) {
        GalacticMapService
          .getChunkPreview(bounds)
          .then((data) => {
            setMarkers(prevState => {
              const newState = [...prevState];
              for (const star of data) {
                if (newState.findIndex(x => x.id === star.id) < 0) {
                  if (newState.length > MAX_ZOOM ** 2) {
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

  const shouldDisplayStar = useCallback((i: number) => {
    if (zoomDiff > 3) {
      if (i % 2 !== 0 || i % 3 !== 0 || i % 5 !== 0) {
        return false;
      }
    }
    if (zoomDiff > 2) {
      if (i % 2 !== 0 || i % 3 !== 0) {
        return false;
      }
    }
    if (zoomDiff > 1) {
      if (i % 2 !== 0) {
        return false;
      }
    }

    return true;
  }, [zoomDiff]);

  return {
    markers: zoomDiff < 5 ? markers : [],
    shouldDisplayStar
  };
}