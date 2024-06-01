import { useDiceStore } from "./DiceStore"
import { printDieSVG } from "./utils"
import { v4 as uuidv4 } from 'uuid';
import { maxNumberOfDice } from "./utils";
import { ModalInt } from "./types";

interface Props {
    dieSize: number
    openModal: (modal: ModalInt) => void;
}

export function DieBtn({ dieSize, openModal }: Props) {
    const { dice } = useDiceStore();

    const addDie = (size: number) => useDiceStore.setState(state => ({
        dice: [...state.dice, {
            id: uuidv4(),
            size: size,
            rolledNumber: null,
            isLocked: false
        }],
    }))

    return (
        <button type="button" onClick={() => {
            if (dice.length < maxNumberOfDice) {
                addDie(dieSize)
            } else {
                openModal({ modal: "errorMaxNumberOfDice" });
            }
        }}>{printDieSVG(dieSize)}<span className="visually-hidden">Add a d{dieSize}</span></button>
    )
}