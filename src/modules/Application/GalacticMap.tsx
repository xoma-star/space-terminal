import {memo, useState} from 'react';
import css from './GalacticMap.module.css';
import classNames from '@/shared/lib/classNames.ts';
import {MAX_CHUNK_DEPTH} from '@/shared/constants.ts';
import StarSystemView from './GalacticMap/ui/StarSystemView';
import {Chunk} from '@/shared/types';
import ChunkView from './GalacticMap/ui/ChunkView';
import SelectChunkView from './GalacticMap/ui/SelectChunkView';
import MapControls from './GalacticMap/ui/MapControls';

function GalacticMap() {
  const [chunk, setChunk] = useState<Chunk | null>(null);

  const chunkDepth = Number(chunk?.split(':')[0].length);
  const shouldDisplayStars = chunkDepth >= MAX_CHUNK_DEPTH;
  const shouldDisplayPlanets = chunkDepth >= MAX_CHUNK_DEPTH + 1;

  return (
    <>
      <MapControls chunk={chunk} setChunk={setChunk} />
      <div className={classNames(css.map, shouldDisplayPlanets && css.planets, 'bg-black grid bg-repeat')}>
        {shouldDisplayPlanets ? (
          <StarSystemView />
        ) : (
          shouldDisplayStars ? (
            <ChunkView chunk={chunk as Chunk} setChunk={setChunk} />
          ) : (
            <SelectChunkView chunk={chunk} setChunk={setChunk} />
          )
        )}
      </div>
    </>
  );
}

export default memo(GalacticMap);