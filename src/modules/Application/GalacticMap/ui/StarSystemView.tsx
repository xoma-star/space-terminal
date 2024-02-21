import Orbit from './Orbit';

/**
 * Обзор звездной системы
 */
export default function StarSystemView() {
  return (
    <div className="flex items-center justify-center relative">
      <Orbit radius={0} />
      <Orbit radius={1} />
      <Orbit radius={2} />
      <Orbit radius={3} />
      <Orbit radius={4} />
      <Orbit radius={5} />
      <Orbit radius={6} />
    </div>
  );
}