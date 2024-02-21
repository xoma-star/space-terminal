import Button from '@/shared/ui/Button/Button';
import classNames from '@/shared/lib/classNames';
import Form from '@/shared/ui/Form/Form';
import FormRow from '@/shared/ui/Form/FormRow';
import Input from '@/shared/ui/Input/Input';
import {Chunk} from '@/shared/types';
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useId, useState} from 'react';

interface MapControlsProps {
  chunk: Chunk | null;
  setChunk(chunk: Dispatch<SetStateAction<Chunk | null>>): void;
}

export default function MapControls(props: MapControlsProps) {
  const {chunk, setChunk} = props;
  const [search, setSearch] = useState('');
  const searchId = useId();

  const isTopLevel = chunk === null;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setChunk(search);
  };

  const levelUpHandler = () => {
    setChunk((prevState: Chunk) => {
      const [x, y] = prevState.split(':');
      if (x.length === 1) {
        return null;
      }
      return `${x.slice(0, -1)}:${y.slice(0, -1)}`;
    });
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="sticky top-0 left-0 flex flex-row gap-3 bg-container z-10 py-3">
      <Button
        className={classNames(isTopLevel && 'hidden')}
        onClick={levelUpHandler}
      >
        Наверх
      </Button>
      <Form onSubmit={submitHandler}>
        <FormRow htmlFor={searchId} label="Перейти по координатам">
          <Input
            value={search}
            onChange={searchHandler}
            id={searchId}
            type="text"
          />
        </FormRow>
        {search && (
          <Button type="submit">
            Открыть
          </Button>
        )}
      </Form>
    </div>
  );
}