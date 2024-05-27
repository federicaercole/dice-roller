import { useDiceStore } from "./DiceStore"
import { printDieSVG } from "./utils"
import { v4 as uuidv4 } from 'uuid';

interface Props {
    dieSize: number
    openErrorModal: () => void;
}

export function DieBtn({ dieSize, openErrorModal }: Props) {
    const { dice } = useDiceStore();
    const maxNumberOfDice = 99;

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
                openErrorModal();
            }
        }}>{printDieSVG(dieSize)}</button>
    )
}