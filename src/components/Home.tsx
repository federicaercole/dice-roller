import { Die } from '../components/Die';
import { DieBtn } from '../components/DieBtn';
import Close from "../assets/svg/close.svg";
import RollDie from "../assets/svg/rollDie.svg";
import { DiceStore, DieInt } from "../components/types";
import { useDiceStore } from './DiceStore';

import { Random, MersenneTwister19937 } from "random-js";
const random = new Random(MersenneTwister19937.autoSeed());

function Home() {
    const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];
    const { dice, settings } = useDiceStore();
    const sum = dice.reduce(sumRolls, 0);

    function sumRolls(prev: number, curr: DieInt): number {
        if (typeof curr.rolledNumber === "number") {
            return prev + curr.rolledNumber;
        }
        return 0;
    }

    const resetDice = () => useDiceStore.setState(state => ({ dice: state.dice.filter(item => item.isLocked === true) }));

    const rollDice = () => useDiceStore.setState(state => ({
        dice: state.dice.map(die => {
            if (!die.isLocked) {
                return { ...die, rolledNumber: random.integer(1, die.size) };
            }
            return die;
        })
    }));

    function getVisibilityClassName(className: string) {
        if (settings.visibility[className as keyof DiceStore]) {
            return `${className} show`;
        }
        return className;
    }

    return (<>
        <ul className={getVisibilityClassName("rolls")}>
            {dice.map(die => <Die key={`die-${die.id}`} die={die} />)}
        </ul>
        <p className={getVisibilityClassName("sum")}>{sum}</p>
        <div className="buttons">
            {dice.length > 0 && <button type="button" className="action" onClick={resetDice}><Close /> Reset</button>}
            {dice.length > 0 && <button type="button" className="action" onClick={rollDice}><RollDie /> Roll</button>}
        </div>
        <div className="buttons dice">
            {dieSize.map(die => <DieBtn dieSize={die} key={`d${die}`} />)}
        </div>
    </>)
}

export default Home