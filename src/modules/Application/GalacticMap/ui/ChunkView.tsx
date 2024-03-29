import generateGalacticChunk from '../lib/generateGalacticChunk';
import Star from './Star';
import BlackHole from './BlackHole';
import NeutronStar from './NeutronStar';
import {useQuery} from '@tanstack/react-query';
import GalacticMapService from '../api/GalacticMapService.ts';
import Loader from '@/shared/ui/Loader/Loader.tsx';

interface ChunkViewProps {
  chunk: Chunk;
  setChunk(chunk: Chunk): void;
}

export default function ChunkView(props: ChunkViewProps) {
  const {chunk, setChunk} = props;
  const chunks = generateGalacticChunk(chunk);
  // TODO: здесь Query с размером, starType, цветом, и названием системы

  return (
    <>
      {chunks.map((item) => {
        const systemData = generateStarSystem(item);
        if (!systemData) {
          return (<div key={item} />);
        }
        switch (systemData.starType) {
          case StarType.STAR:
            return (
              <Star
                onClick={() => setChunk(item)}
                key={item}
                luminosityClass={systemData.luminosityClass}
                spectralClass={systemData.spectralClass}
              />
            );
          case StarType.BLACK_HOLE:
            return (
              <BlackHole
                key={item}
                blackHoleType={systemData.blackHoleType}
                onClick={() => setChunk(item)}
              />
            );
          case StarType.NEUTRON_STAR:
            return (
              <NeutronStar
                key={item}
                onClick={() => setChunk(item)}
              />
            );
        }
      })}
    </>
  );
}