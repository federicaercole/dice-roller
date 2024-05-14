import { useDiceStore } from "./DiceStore"
import { printDieSVG } from "./utils"

interface Props {
    dieSize: number
}

export function DieBtn({ dieSize }: Props) {

    const addDie = (size: number) => useDiceStore.setState(state => ({
        numberOfDice: ++state.numberOfDice,
        dice: [...state.dice, {
            id: state.numberOfDice,
            size: size,
            rolledNumber: null,
            isLocked: false
        }],
    }))

    return (
        <button type="button" onClick={() => addDie(dieSize)}>{printDieSVG(dieSize)}</button>
    )
}