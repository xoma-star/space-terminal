import {memo, useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {LatLngBounds} from 'leaflet';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from './GalacticMap/api/GalacticMapService.ts';

function MapEvents() {
  const map = useMap();
  const mapEvents = useMapEvents({
    dragend(e){
      console.log(map.getBounds())
    }
  });

  return null;
}

const MAX_BOUNDS = new LatLngBounds([54, 54], [55, 55]);

function GalacticMap() {
  const [markers, setMarkers] = useState([]);
  const {data} = useQuery({queryKey: ['biba'], queryFn: () => GalacticMapService.getChunkPreview([54, 54], [55, 55])});

  console.log(data);

  return (
    <MapContainer
      center={{lng: 54.5, lat: 54.5}}
      zoom={13}
      minZoom={11}
      className="w-full h-[800px]"
      maxBounds={MAX_BOUNDS}
    >
      <TileLayer
        url="http://localhost:3000/map/{z}/{x}/{y}"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
    </MapContainer>
  );
}

export default memo(GalacticMap);