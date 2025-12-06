import { StatBar } from "../StatBar";

export default function StatBarExample() {
  return (
    <div className="p-6 w-full max-w-md space-y-3">
      <StatBar label="hp" value={78} />
      <StatBar label="attack" value={84} />
      <StatBar label="defense" value={78} />
      <StatBar label="specialAttack" value={109} />
      <StatBar label="specialDefense" value={85} />
      <StatBar label="speed" value={100} />
    </div>
  );
}
