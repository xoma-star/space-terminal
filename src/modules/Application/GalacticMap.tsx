import {memo, useState} from 'react';
import {renderToString} from 'react-dom/server';
import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import {divIcon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from './GalacticMap/api/GalacticMapService.ts';
import Star from './GalacticMap/ui/Star';
import {StarType, type SystemData} from '@xoma_star/shared-stellar-goose';
import BlackHole from './GalacticMap/ui/BlackHole.tsx';

const MAX_ZOOM = 18;

function Map() {
  const [bounds, setBounds] = useState(null);
  const [markers, setMarkers] = useState<SystemData[]>([]);

  const map = useMap();
  const zoom = map.getZoom();

  useQuery({
    queryKey: ['biba', bounds, zoom],
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
            console.error(e);
            return [];
          });
      }

      return [];
    }
  });

  useMapEvents({
    moveend(){
      setBounds(map.getBounds());
    },
    load() {
      setBounds(map.getBounds());
    }
  });

  const zoomDiff = MAX_ZOOM - zoom;

  return (
    <>
      <TileLayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="http://localhost:3000/map/{z}/{x}/{y}"
      />
      {zoomDiff < 5 && markers.map((x, i) => {
        if (zoomDiff > 3) {
          if (i % 2 !== 0 || i % 3 !== 0 || i % 5 !== 0) {
            return null;
          }
        }
        if (zoomDiff > 2) {
          if (i % 2 !== 0 || i % 3 !== 0) {
            return null;
          }
        }
        if (zoomDiff > 1) {
          if (i % 2 !== 0) {
            return null;
          }
        }

        let component;
        switch (x.starType) {
          case StarType.STAR:
            component = (
              <Star
                spectralClass={x.spectralClass}
                luminosityClass={x.luminosityClass}
              />
            );
            break;
          case StarType.BLACK_HOLE:
            component = (
              <BlackHole
                blackHoleType={x.blackHoleType}
              />
            );
        }

        const html = renderToString(component);

        return (
          <Marker
            position={[x.y, x.x]}
            key={x.id}
            icon={divIcon({
              className: 'abiba',
              html
            })}
          />
        );
      })}
    </>
  );
}

function GalacticMap() {
  return (
    <MapContainer
      center={{lng: 54.5, lat: 54.5}}
      zoom={18}
      minZoom={2}
      className="w-full h-[800px] bg-black"
      attributionControl={false}
    >
      <Map />
    </MapContainer>
  );
}

export default memo(GalacticMap);