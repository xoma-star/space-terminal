import {useEffect, useRef, useState} from 'react';
import useStore from '@/shared/store';
import {Application} from '@/shared/constants';
import {Chunk} from '@/shared/types';

export default function useChunkSelector(chunk: Chunk | null) {
  const {activeWindow} = useStore();
  const [focusedChunk, setFocusedChunk] = useState<Chunk | null>(null);
  const buttonsRef = useRef<Record<Chunk, HTMLButtonElement>>({});

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      const focusChunk = (chunk: Chunk) => {
        setFocusedChunk(chunk);
        buttonsRef.current[chunk].focus();
      };
      const addOne = (value: string, remove: boolean = false) => {
        let result = parseInt(value, 32) + 1 - 2 * Number(remove);
        result = Math.max(result, 0);
        result = Math.min(result, 31);
        return result.toString(32).toUpperCase();
      };

      const parsedChunk = (focusedChunk ?? chunk ?? '0:0').split(':');
      switch (e.key) {
        case 'ArrowRight': return focusChunk(`${parsedChunk[0]}:${addOne(parsedChunk[1])}`);
        case 'ArrowLeft': return focusChunk(`${parsedChunk[0]}:${addOne(parsedChunk[1], true)}`);
        case 'ArrowUp': return focusChunk(`${addOne(parsedChunk[0], true)}:${parsedChunk[1]}`);
        case 'ArrowDown': return focusChunk(`${addOne(parsedChunk[0])}:${parsedChunk[1]}`);
      }
    };
    if (activeWindow === Application.MAP) {
      document.addEventListener('keydown', keyboardHandler);

      return () => document.removeEventListener('keydown', keyboardHandler);
    }
  }, [activeWindow, chunk, focusedChunk]);

  return {
    buttonsRef
  };
}