import { Die } from '../components/Die';
import Close from "../assets/svg/close.svg";
import RollDie from "../assets/svg/rollDie.svg";
import { DiceStore, DieInt, ModalInt } from "../components/types";
import { useDiceStore } from './DiceStore';
import { useState } from 'react';
import Modal from './Modal';
import DiceInput from './DiceInput';
import Add from "../assets/svg/add.svg";

import { Random, MersenneTwister19937 } from "random-js";
import { maxNumberOfSets, printDice } from './utils';

const random = new Random(MersenneTwister19937.autoSeed());

function Home() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ModalInt>({ modal: "" });

    const { dice, settings } = useDiceStore();
    const sum = dice.reduce(sumRolls, 0);

    function openModal(modal: ModalInt) {
        setIsModalOpen(true);
        setModalContent(modal);
    }

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

    return (<main className="home">
        <ul className={getVisibilityClassName("rolls")}>
            {dice.map(die => <Die key={`die-${die.id}`} die={die} />)}
        </ul>
        {!settings.visibility.rolls && <div className="dice-summary">{printDice(dice)}</div>}
        <p className={getVisibilityClassName("sum")}>{sum}</p>
        <div className="buttons">
            {dice.length > 0 && <button type="button" className="action" onClick={() => {
                if (settings.sets.length < maxNumberOfSets) {
                    openModal({ modal: "add", set: { name: "", dice } })
                } else {
                    openModal({ modal: "errorMaxNumberOfSets" });
                }
            }}><Add /> Save dice</button>}
            {dice.length > 0 && <button type="button" className="action" onClick={resetDice}><Close /> Reset</button>}
            {dice.length > 0 && <button type="button" className="action" onClick={rollDice}><RollDie /> Roll</button>}
        </div>
        <DiceInput openModal={openModal} />
        {isModalOpen && <Modal setIsOpen={setIsModalOpen} modalContent={modalContent} />}
    </main>)
}

export default Home