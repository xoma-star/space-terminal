import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import css from './Terminal.module.css';
import commandHandler from './Terminal/lib/commandHandler';
import useWindows from '@/shared/lib/useWindows';

function Terminal() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const {showError} = useWindows();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const newMessages = [...messages, input];
    try {
      commandHandler(input);
    } catch (e: Error) {
      newMessages.push(e.message);
      showError(e);
    }
    setMessages(newMessages);
    setInput('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
    >
      <form onSubmit={submitHandler}>
        <input ref={inputRef} type="text" className="w-0 absolute" value={input} onChange={changeHandler} />
      </form>
      <div className="w-full h-full bg-black text-white min-h-72 cursor-default cursor-text">
        {[...messages, input].map((x, i) => (
          <div key={i} className="flex flex-row">
            <span className="text-green-500">[root@localhost ~]$</span>
            <span className="ml-2xs whitespace-pre">{x}</span>
            {i === messages.length && <span className={css.caret}>_</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;