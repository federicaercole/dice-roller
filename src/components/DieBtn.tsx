import { useDiceStore } from "./DiceStore"
import { printDieSVG } from "./utils"
import { v4 as uuidv4 } from 'uuid';

interface Props {
    dieSize: number
}

export function DieBtn({ dieSize }: Props) {

    const addDie = (size: number) => useDiceStore.setState(state => ({
        dice: [...state.dice, {
            id: uuidv4(),
            size: size,
            rolledNumber: null,
            isLocked: false
        }],
    }))

    return (
        <button type="button" onClick={() => addDie(dieSize)}>{printDieSVG(dieSize)}</button>
    )
}