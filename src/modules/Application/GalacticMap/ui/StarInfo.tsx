import {type StarType, type SystemData} from '@xoma_star/shared-stellar-goose';
import {Button, Image, Paragraph} from '@/shared/ui';

export default function StarInfo(props: SystemData<StarType>) {
  const {
    name,
    x,
    y
  } = props;

  return (
    <div className="flex flex-row gap-xs p-3xs">
      <Image
        src="./backdrops/star_preview.png"
        alt="white star in space"
        className="w-36 h-72 object-cover"
      />
      <Paragraph>
        Система {name}. Координаты системы {x}:{y}
        <div className="flex flex-row gap-xs">
          <Button>
            Перелет
          </Button>
          <Button>
            Сканировать
          </Button>
        </div>
      </Paragraph>
    </div>
  );
}