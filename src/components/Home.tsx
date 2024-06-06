import { Die } from '../components/Die';
import Close from "../assets/svg/close.svg";
import RollDie from "../assets/svg/rollDie.svg";
import { DiceStore, DieInt } from "../components/types";
import { useDiceStore } from './DiceStore';
import { useRef } from 'react';
import Modal from './Modal';
import DiceInput from './DiceInput';
import Add from "../assets/svg/add.svg";
import { useModal } from './useModal';
import { Link } from 'react-router-dom';

import { Random, MersenneTwister19937 } from "random-js";
import { maxNumberOfSets, printDice } from './utils';
import { Heading } from './Heading';

const random = new Random(MersenneTwister19937.autoSeed());

function Home() {
    const rollBtn = useRef<HTMLButtonElement>(null);
    const modal = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, modalContent, openModal } = useModal(modal);

    const { dice, settings } = useDiceStore();
    const sum = dice.reduce(sumRolls, 0);

    function sumRolls(prev: number, curr: DieInt): number {
        if (typeof curr.rolledNumber === "number") {
            return prev + curr.rolledNumber;
        }
        return 0;
    }

    const clearDice = () => useDiceStore.setState(state => ({ dice: state.dice.filter(item => item.isLocked === true) }));

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
        {dice.length > 0 && <Link className="skip-link" to="#roll" onClick={() => { if (rollBtn.current) rollBtn.current.focus() }}>Skip to roll button</Link>}
        <main className="flex home">
            <Heading className="visually-hidden">Homepage</Heading>
            <ul className={getVisibilityClassName("rolls")}>
                {dice.map(die => <Die key={`die-${die.id}`} die={die} />)}
            </ul>
            {!settings.visibility.rolls && <div className="dice-summary">{printDice(dice)}</div>}
            <p className={getVisibilityClassName("sum")}><span key={sum ? new Date().getTime() : sum} aria-live="polite"><span className="visually-hidden">Total:</span>{sum}</span></p>
            <div className="buttons" id="action-buttons">
                {dice.length > 0 && <button type="button" className="action" onClick={() => {
                    if (settings.sets.length < maxNumberOfSets) {
                        openModal({ modal: "add", set: { name: "", dice } })
                    } else {
                        openModal({ modal: "errorMaxNumberOfSets" });
                    }
                }}><Add /> Save dice</button>}
                {dice.length > 0 && <button type="button" className="action" onClick={clearDice}><Close /> Clear</button>}
                {dice.length > 0 && <button type="button" className="action" id="roll" ref={rollBtn} onClick={rollDice}><RollDie /> Roll</button>}
            </div>
            <DiceInput openModal={openModal} />
            {isOpen && <Modal innerRef={modal} setIsOpen={setIsOpen} modalContent={modalContent} />}
        </main>
    </>)
}

export default Home