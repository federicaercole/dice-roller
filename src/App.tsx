import { useState } from 'react'
import { Die } from './components/Die';
import { DieBtn } from './components/DieBtn';
import Close from "./assets/svg/close.svg";
import RollDie from "./assets/svg/rollDie.svg";
import { DieInt } from "./components/types";

function App() {
  const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];
  const [dice, setDice] = useState<DieInt[]>([]);
  const sum = dice.reduce(sumRolls, 0);

  function roll() {
    const randomNubers = dice.map((die) => {
      return { ...die, rolledNumber: Math.floor(Math.random() * die.size) + 1 }
    });
    return setDice(randomNubers);
  }

  function sumRolls(prev: number, curr: DieInt): number {
    if (typeof curr.rolledNumber === "number") {
      return prev + curr.rolledNumber;
    }
    return 0;
  }

  function addDice(size: number): void {
    setDice([...dice, {
      id: dice.length + 1,
      size: size,
      rolledNumber: null,
    }]);
  }

  function reset() {
    setDice([]);
  }

  return (
    <main>
      <ul>
        {dice.map(die => <Die key={`die-${die.id}`} die={die} />)}
      </ul>
      <p className="sum">{sum}</p>
      <div className="buttons">
        {dice.length > 0 && <button type="button" className="action" onClick={reset}><Close /> Reset</button>}
        {dice.length > 0 && <button type="button" className="action" onClick={roll}><RollDie /> Roll</button>}
      </div>
      <div className="buttons dice">
        {dieSize.map((die) => <DieBtn addDice={addDice} dieSize={die} key={`d${die}`} />)}
      </div>
    </main>
  )
}

export default App
