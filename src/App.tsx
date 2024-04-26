import { useState } from 'react'
import { Die } from './components/Die';
import { DieBtn } from './components/DieBtn';

function App() {
  const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];
  const [dice, setDice] = useState<number[]>([]);
  const [rolledNumbers, setRolledNumbers] = useState<number[]>([]);
  const sum = rolledNumbers.reduce((prev, curr) => prev + curr, 0);

  function roll() {
    const randomNubers = dice.map((dieSize) => Math.floor(Math.random() * dieSize) + 1);
    return setRolledNumbers([...randomNubers]);
  }

  function addDice(size: number): void {
    setDice([...dice, size]);
  }

  function reset() {
    setDice([]);
    setRolledNumbers([]);
  }

  return (
    <main>
      <ul>
        {dice.map((die, index) => <Die key={`die-${index}`} index={index} dieSize={die} rolledNumbers={rolledNumbers} />)}
      </ul>
      <p className="sum">{sum !== 0 && sum}</p>
      <div className="buttons">
        {dice.length != 0 && <button type="button" onClick={() => roll()}>Roll dice</button>}
        {dice.length != 0 && <button type="button" onClick={() => reset()}>Reset</button>}
      </div>
      <div className="buttons">
        {dieSize.map((die) => <DieBtn addDice={addDice} dieSize={die} key={`d${die}`} />)}
      </div>
    </main>
  )
}

export default App
