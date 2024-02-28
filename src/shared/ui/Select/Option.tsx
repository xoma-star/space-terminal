import {HTMLAttributes} from 'react';

interface OptionProps extends HTMLAttributes<HTMLOptionElement> {
}

function Option(props: OptionProps) {
  return (
    <option {...props} />
  );
}

export default Option;