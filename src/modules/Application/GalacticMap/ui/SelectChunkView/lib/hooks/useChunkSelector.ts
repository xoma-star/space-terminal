import {useEffect, useRef, useState} from 'react';
import useStore from '@/shared/store';
import {Application} from '@/shared/constants';
import {Chunk} from '@/shared/types';

export default function useChunkSelector(chunk: Chunk | null, setChunk: (chunk: Chunk) => void) {
  const {activeWindow} = useStore();
  const [focusedChunk, setFocusedChunk] = useState<Chunk | null>(chunk);
  const buttonsRef = useRef<Record<Chunk, HTMLButtonElement>>({});

  const focusChunk = (selectedChunk: Chunk) => {
    setFocusedChunk(selectedChunk);
    const ref = buttonsRef.current[selectedChunk];
    ref?.focus();
  };

  const selectChunkHandler = (selectedChunk: Chunk, save?: boolean) => {
    let newChunk = save ? chunk : selectedChunk?.split(':').map(x => x + x.slice(-1)).join(':') as Chunk;
    if (selectedChunk.length === 1) {
      newChunk = save ? chunk : null;
      selectedChunk = null;
    }
    setChunk(selectedChunk);
    focusChunk(newChunk);
  };

  useEffect(() => {
    const addOne = (value: string, remove: boolean = false) => {
      let result = parseInt(value.slice(-1), 32) + 1 - 2 * Number(remove);
      result = Math.max(result, 0);
      result = Math.min(result, 31);
      return value.slice(0, -1) + result.toString(32).toUpperCase();
    };

    const keyboardHandler = (e: KeyboardEvent) => {
      // если chunk null - значит на верхнем уровне, тогда можно поставить 0:0
      const parsedChunk = (focusedChunk ?? '0:0').split(':');
      switch (e.key) {
        case 'ArrowRight':
          return focusChunk(`${parsedChunk[0]}:${addOne(parsedChunk[1])}`);
        case 'ArrowLeft':
          return focusChunk(`${parsedChunk[0]}:${addOne(parsedChunk[1], true)}`);
        case 'ArrowUp':
          return focusChunk(`${addOne(parsedChunk[0], true)}:${parsedChunk[1]}`);
        case 'ArrowDown':
          return focusChunk(`${addOne(parsedChunk[0])}:${parsedChunk[1]}`);
        case 'Escape':
          return selectChunkHandler(parsedChunk.map(x => x.slice(0, -2)).join(':'), true);
        default:
      }
    };

    if (activeWindow === Application.MAP) {
      document.addEventListener('keydown', keyboardHandler);
      return () => document.removeEventListener('keydown', keyboardHandler);
    }
  }, [activeWindow, chunk, focusedChunk]);

  return {
    buttonsRef,
    selectChunkHandler
  };
}