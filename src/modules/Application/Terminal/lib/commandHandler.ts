const KNOWN_COMMANDS = ['travel'];

export default function commandHandler(payload: string) {
  const singleSpaces = payload.replace(/\s+/g, ' ');
  const data = singleSpaces.split(' ');

  // TODO подумать, как проверять наличие команды
  if (!KNOWN_COMMANDS.includes(data[0])) {
    throw new Error(`Команда не найдена: ${data[0]}`);
  }
}