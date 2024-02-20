import {memo, useId, useState} from 'react';
import generateStarSystem from '@/shared/lib/generateStarSystem.ts';
import Star from './GalacticMap/ui/Star.tsx';
import css from './GalacticMap.module.css';
import classNames from '@/shared/lib/classNames.ts';
import generateGalacticChunk from './GalacticMap/lib/generateGalacticChunk.ts';
import Button from '@/shared/ui/Button/Button.tsx';
import {MAX_CHUNK_DEPTH, StarType} from '@/shared/constants.ts';
import Form from '@/shared/ui/Form/Form.tsx';
import FormRow from '@/shared/ui/Form/FormRow.tsx';
import Input from '@/shared/ui/Input/Input.tsx';
import BlackHole from './GalacticMap/ui/BlackHole.tsx';
import NeutronStar from './GalacticMap/ui/NeutronStar.tsx';
import Orbit from './GalacticMap/ui/Orbit.tsx';

function GalacticMap() {
  const [chunk, setChunk] = useState<`${string}:${string}` | null>(null);

  const chunkDepth = Number(chunk?.split(':')[0].length);
  const shouldDisplayStars = chunkDepth >= MAX_CHUNK_DEPTH;
  const shouldDisplayPlanets = chunkDepth >= MAX_CHUNK_DEPTH + 1;
  const isTopLevel = chunk === null;
  let displayArray = generateGalacticChunk(chunk);

  const searchId = useId();

  return (
    <>
      <div className="sticky top-0 left-0 flex flex-row gap-3 bg-container z-10 py-3">
        <Button
          className={classNames(isTopLevel && 'hidden')}
          onClick={() => setChunk((prevState) => {
            const [x, y] = prevState.split(':');
            if (x.length === 1) {
              return null;
            }
            return `${x.slice(0, -1)}:${y.slice(0, -1)}`;
          })}
        >
          Наверх
        </Button>
        <Form>
          <FormRow htmlFor={searchId} label="Перейти по координатам">
            <Input id={searchId} type="text" />
          </FormRow>
        </Form>
      </div>
      <div className={classNames(css.map, shouldDisplayPlanets && css.planets, 'bg-black grid bg-repeat')}>
        {shouldDisplayPlanets ? (
          <div className="flex items-center justify-center relative">
            <Orbit radius={0} />
            <Orbit radius={1} />
            <Orbit radius={2} />
            <Orbit radius={3} />
            <Orbit radius={4} />
            <Orbit radius={5} />
            <Orbit radius={6} />
          </div>
        ) : (
          displayArray.map((x) => {
            if (shouldDisplayStars) {
              const systemData = generateStarSystem(x);
              if (!systemData) {
                return (<div key={x} />);
              }
              switch (systemData.starType) {
                case StarType.STAR: return (
                  <Star
                    onClick={() => setChunk(x)}
                    key={x}
                    luminosityClass={systemData.luminosityClass}
                    spectralClass={systemData.spectralClass}
                  />
                );
                case StarType.BLACK_HOLE: return (
                  <BlackHole
                    key={x}
                    blackHoleType={systemData.blackHoleType}
                    onClick={() => setChunk(x)}
                  />
                );
                case StarType.NEUTRON_STAR: return (
                  <NeutronStar
                    key={x}
                    onClick={() => setChunk(x)}
                  />
                );
              }
            }
            return (
              <button
                key={x}
                type="button"
                className="bg-transparent border-2 border-gray-400 text-gray-400 focus:bg-gray-400 focus:text-black"
                onClick={() => setChunk(x)}
              >
                {x}
              </button>
            );
          }))}
      </div>
    </>
  );
}

export default memo(GalacticMap);