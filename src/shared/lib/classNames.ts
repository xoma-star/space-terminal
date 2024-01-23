type PayloadItem = string | boolean | null | undefined;

export default function classNames(...args: PayloadItem[]): string {
  return args
    .filter((x) => Boolean(x))
    .join(' ');
}