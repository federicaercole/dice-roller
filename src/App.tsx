import { useState } from 'react'
import { Die } from './components/Die';
import './App.css'

function App() {
  const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];
  const [dice, setDice] = useState<number[]>([]);

  function addDice(size: number): void {
    setDice([...dice, size]);
  }

  return (
    <>
      {dieSize.map((die) => <Die addDice={addDice} dieSize={die} key={`d${die}`} />)}
    </>
  )
}

export default App
