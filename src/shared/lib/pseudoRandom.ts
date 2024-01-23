import seedrandom from 'seedrandom';

export function weightRandom<T extends string>(probs: Record<T, number>, seed: string): T {
  const random = seedrandom(seed)();
  const weights = (Object.keys(probs) as T[])
    .map((key) => ({key, weight: probs[key]}))
    .sort((a, b) => b.weight - a.weight);
  let sum = 0;
  for (const weight of weights) {
    sum += weight.weight;
    if (random <= sum) {
      return weight.key;
    }
  }

  return weights[weights.length - 1].key;
}