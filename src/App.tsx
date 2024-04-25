import { useState } from 'react'
import { Die } from './components/Die';
import './App.css'

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
    <>
      {dieSize.map((die) => <Die addDice={addDice} dieSize={die} key={`d${die}`} />)}
      {rolledNumbers.map((item, index) => <p key={`die-${index}`}>{item}</p>)}
      {dice.length != 0 && <button type="button" onClick={() => roll()}>Roll dice</button>}
      {dice.length != 0 && <button type="button" onClick={() => reset()}>Reset</button>}
      <p>{sum !== 0 && sum}</p>
    </>
  )
}

export default App
