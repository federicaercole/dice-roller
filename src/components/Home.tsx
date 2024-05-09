import { useState, useRef } from 'react'
import { Die } from '../components/Die';
import { DieBtn } from '../components/DieBtn';
import Close from "../assets/svg/close.svg";
import RollDie from "../assets/svg/rollDie.svg";
import { DieInt } from "../components/types";

import { Random, MersenneTwister19937 } from "random-js";
const random = new Random(MersenneTwister19937.autoSeed());

function Home() {
    const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];
    const [dice, setDice] = useState<DieInt[]>([]);
    const sum = dice.reduce(sumRolls, 0);
    const numberOfDice = useRef(0);

    function roll() {
        const randomNubers = dice.map((die) => {
            return { ...die, rolledNumber: random.integer(1, die.size) }
        });
        return setDice(randomNubers);
    }

    function sumRolls(prev: number, curr: DieInt): number {
        if (typeof curr.rolledNumber === "number") {
            return prev + curr.rolledNumber;
        }
        return 0;
    }

    function getId() {
        numberOfDice.current += 1;
        return numberOfDice.current;
    }

    function addDice(size: number): void {
        setDice([...dice, {
            id: getId(),
            size: size,
            rolledNumber: null,
            isLocked: false
        }]);
    }

    function reset() {
        setDice(dice.filter(item => item.isLocked === true));
    }

    return (<>
        <ul>
            {dice.map(die => <Die key={`die-${die.id}`} die={die} dice={dice} setDice={setDice} />)}
        </ul>
        <p className="sum">{sum}</p>
        <div className="buttons">
            {dice.length > 0 && <button type="button" className="action" onClick={reset}><Close /> Reset</button>}
            {dice.length > 0 && <button type="button" className="action" onClick={roll}><RollDie /> Roll</button>}
        </div>
        <div className="buttons dice">
            {dieSize.map((die) => <DieBtn addDice={addDice} dieSize={die} key={`d${die}`} />)}
        </div>
    </>)
}

export default Home