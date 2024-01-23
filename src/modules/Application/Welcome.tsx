import {useState} from 'react';
import Startup from './Welcome/Startup.tsx';
import SignupForm from './Welcome/SignupForm.tsx';
import Image from '@/shared/ui/Image/Image.tsx';

function Welcome() {
  const [step, setStep] = useState(0);

  let content;
  switch (step) {
    case 0:
      content = <Startup changeStep={() => setStep(1)} />;
      break;
    case 1:
      content = <SignupForm />;
      break;
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/3 flex-shrink-0">
        <Image
          src={`/backdrops/${step === 0 ? 'space' : 'lagoon'}.png`}
          alt="space"
          className="h-full w-full object-cover"
        />
      </div>
      {content}
    </div>
  );
}

export default Welcome;