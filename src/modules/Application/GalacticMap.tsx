import {memo} from 'react';
import {renderToString} from 'react-dom/server';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {divIcon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useGalacticMap from './GalacticMap/lib/useGalacticMap';
import StarPreview from './GalacticMap/ui/StarPreview';

function Map() {
  const {
    markers,
    shouldDisplayStar
  } = useGalacticMap();

  return (
    <>
      <TileLayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="http://localhost:3000/map/{z}/{x}/{y}"
      />
      {markers.map((marker, i) => {
        if (!shouldDisplayStar(i)) {
          return null;
        }

        const html = renderToString(<StarPreview {...marker} />);

        return (
          <Marker
            position={[marker.y, marker.x]}
            key={marker.id}
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e)
              }
            }}
            icon={divIcon({
              className: '',
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