import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import css from './Terminal.module.css';
import useStore from '@/shared/store';
import {Application} from '@/shared/constants';
import commandHandler from './Terminal/lib/commandHandler';

function Terminal() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const {activeWindow} = useStore();

  useEffect(() => {
    if (activeWindow === Application.TERMINAL) {
      inputRef.current?.focus();
    }
  }, [input, activeWindow]);

  const changeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      setInput((prevState) => prevState.slice(0, -1));
    } else if (e.key === 'Enter') {
      setMessages((prevState) => {
        const newMessages = [...prevState, input];

        try {
          commandHandler(input);
        } catch (e: Error) {
          newMessages.push(e.message);
        }

        return newMessages;
      });
      setInput('');
    } else if (e.key.length === 1) {
      setInput((prevState) => prevState + e.key);
    }
  };

  return (
    <div onClick={() => inputRef.current?.focus()}>
      <input ref={inputRef} type="text" className="w-0 absolute" value={input} onKeyDown={changeHandler} />
      <div className="w-full h-full bg-black text-white min-h-72 cursor-default">
        {[...messages, input].map((x, i) => (
          <div key={i} className="flex flex-row">
            <span className="text-green-500">[root@localhost ~]$</span>
            <span className="ml-2 whitespace-pre">{x}</span>
            {i === messages.length && <span className={css.caret}>_</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;