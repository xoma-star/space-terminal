import React, {useEffect, useState} from 'react';
import css from './Terminal.module.css';

function Terminal(props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
        setInput((prevState) => prevState.slice(0, -1));
      } else if (e.key === 'Enter') {
        setMessages((prevState) => [...prevState, input]);
        setInput('');
      } else if (e.key.length === 1) {
        setInput((prevState) => prevState + e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <div>
      <input type="text" className="invisible absolute"/>
      <div className="w-full h-full bg-black text-white min-h-72 cursor-default">
        {[...messages, input].map((x, i) => (
          <div key={i} className="flex flex-row">
            <div className="text-green-500">[root@localhost ~]$</div>
            <div className="ml-2">{x}</div>
            {i === messages.length && <div className={css.caret}>_</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terminal;