import generateGalacticChunk from '../lib/generateGalacticChunk';
import {Chunk} from '@/shared/types';

interface SelectChunkViewProps {
  chunk: Chunk | null;
  setChunk(chunk: Chunk): void;
}

/**
 * Обзор всей галактики (выбор чанков)
 */
export default function SelectChunkView(props: SelectChunkViewProps) {
  const {chunk, setChunk} = props;
  const chunks = generateGalacticChunk(chunk);

  return (
    <>
      {chunks.map((x: Chunk) => (
        <button
          key={x}
          type="button"
          className="bg-transparent border-2 border-gray-400 text-gray-400 focus:bg-gray-400 focus:text-black"
          onClick={() => setChunk(x)}
        >
          {x}
        </button>
      ))}
    </>
  );
}