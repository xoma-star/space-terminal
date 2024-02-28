import generateGalacticChunk from '../lib/generateGalacticChunk';
import {Chunk} from '@/shared/types';
import useChunkSelector from './SelectChunkView/lib/hooks/useChunkSelector';

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
  const {buttonsRef, selectChunkHandler} = useChunkSelector(chunk, setChunk);

  return (
    <>
      {chunks.map((x: Chunk) => (
        <button
          key={x}
          ref={(ref) => {
            buttonsRef.current[x] = ref;
          }}
          type="button"
          className="bg-transparent border-2 border-gray-400 text-gray-400 focus:bg-gray-400 focus:text-black"
          onClick={() => selectChunkHandler(x)}
        >
          {x}
        </button>
      ))}
    </>
  );
}