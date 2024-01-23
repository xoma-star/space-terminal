import {useEffect, useState} from 'react';
import generateStarSystem from '@/shared/lib/generateStarSystem.ts';
import Star from './Map/GalacticMap/ui/Star.tsx';

export default function Map() {
  // const [stars, setStars] = useState([]);
  // useEffect(() => {
  //
  //   setStars(a)
  // }, []);

  const now = Date.now();
  const stars = [];
  for (let i = 0; i < 256; i++) {
    stars.push(generateStarSystem((i + now).toString()));
  }

  return (
    <div style={{
      width: 1600,
      height: 1600,
      display: 'grid',
      backgroundImage: 'url("/stars.svg")',
      backgroundRepeat: 'repeat',
      backgroundColor: '#000',
      gridTemplateColumns: 'repeat(16, 1fr)',
      gridTemplateRows: 'repeat(16, 1fr)'
    }}>
      {stars && stars.map((star, i) => (
        star ? (
          <Star key={i}
                type={star.starType}
                luminosityClass={star.luminosityClass}
                spectralClass={star.spectralClass}
                blackHoleType={star.blackHoleType}
          />
        ) : (
          <div />
        )
      ))}
    </div>
  );
}