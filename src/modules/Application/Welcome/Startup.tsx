import Title from '@/shared/ui/Title/Title.tsx';
import Paragraph from '@/shared/ui/Paragraph/Paragraph.tsx';
import Button from '@/shared/ui/Button/Button.tsx';

interface Props {
  changeStep(): void;
}

function Startup(props: Props) {
  return (
    <div className="flex flex-col gap-3 flex-grow-[1]">
      <Title className="mb-2">Добро пожаловать!</Title>
      <Paragraph>
        Программе &quot;Единая Галактика&quot; требуются люди, для освоения галактики
        UGC 8833. Вам предлагается основать и возглавить компанию, которая будет добывать ресурсы,
        развивать инфраструктуру, исследовать планеты и системы.
      </Paragraph>
      <Paragraph>
        Программа предлагает вам сотрудничество: вы обязаны будете платить определенный процент
        от ваших сделок, а программа будет всячески вам помогать в развитии: ссуды, кредиты, каналы
        поставок и др.
      </Paragraph>
      <Paragraph>
        Мы не можем раскрывать подробности программы до тех пор, пока вы
        не заключите контракт. Для подписания просто нажмите кнопку ниже.
      </Paragraph>
      <Button
        onClick={props.changeStep}
        className="self-end mt-2"
      >
        Заполнить форму
      </Button>
    </div>
  );
}

export default Startup;