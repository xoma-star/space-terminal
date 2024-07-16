import {memo, useState} from 'react';
import {renderToString} from 'react-dom/server';
import {MapContainer, TileLayer, useMap, useMapEvents, Marker} from 'react-leaflet';
import {divIcon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from './GalacticMap/api/GalacticMapService.ts';
import Star from './GalacticMap/ui/Star';

const MAX_ZOOM = 18;

function Map() {
  const [bounds, setBounds] = useState(null);
  const [markers, setMarkers] = useState([]);

  const map = useMap();
  const zoom = map.getZoom();

  useQuery({
    queryKey: ['biba', bounds, zoom],
    queryFn: () => {
      if (zoom > MAX_ZOOM - 2) {
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

        const html = renderToString(
          <Star
            spectralClass={x.spectralClass}
            luminosityClass={x.luminosityClass}
          />
        );

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