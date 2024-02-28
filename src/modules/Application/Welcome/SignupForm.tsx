import Input from '@/shared/ui/Input/Input';
import Form from '@/shared/ui/Form/Form';
import FormRow from '@/shared/ui/Form/FormRow';
import {useId} from 'react';
import Select from '@/shared/ui/Select/Select';
import Option from '@/shared/ui/Select/Option';
import Range from '@/shared/ui/Range/Range';
import Button from '@/shared/ui/Button/Button';

function SignupForm(props) {
  const orgNameId = useId();
  const orgType = useId();
  const budget = useId();

  return (
    <Form className="flex-grow-[1] pr-2">
      <FormRow direction="column" label="Название организации:" htmlFor={orgNameId}>
        <Input type="text" id={orgNameId} />
      </FormRow>
      <FormRow
        label="Деятельность организации:"
        htmlFor={orgType}
        caption="* Выбор повлияет только на стартовый набор ресурсов"
        direction="column"
      >
        <Select id={orgType}>
          <Option value="1">Исследование</Option>
          <Option value="2">Охрана</Option>
          <Option value="3">Добыча</Option>
          <Option value="4">Торговля</Option>
        </Select>
      </FormRow>
      <FormRow direction="column" label="Распределение бюджета:" htmlFor={budget}>
        <Range
          id={budget}
          min="0"
          max="2"
          leftLabel="Нераспределено"
          rightLabel="Рекомендуемое оборудование"
        />
      </FormRow>
      <FormRow
        direction="column"
      >
        <Button
          type="submit"
          className="self-end mt-2"
        >
          Готово
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;