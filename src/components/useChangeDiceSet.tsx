import { v4 as uuidv4 } from 'uuid';
import useFormInput from "./useFormInput";
import { produce } from "immer";
import { useDiceStore } from "./DiceStore";
import { DiceSetInt } from './types';
import { countDice } from './utils';

export function useChangeDiceSet(set?: DiceSetInt) {
    const setName = useFormInput(set?.name ?? "");
    const diceSet = useFormInput(getDiceStringFormat());

    function getDiceStringFormat(setDice = set?.dice) {
        if (setDice) {
            const obj = countDice(setDice);
            const elements = [];
            for (const key in obj) {
                elements.push(`${obj[key]}d${key}`);
            }
            return elements.join(" + ")
        }
        return "";
    }

    function getDice(diceSizes: string[]) {
        const dice = [];
        for (const die of diceSizes) {
            const numberOfDice = Number(die.split("d")[0]);
            const size = Number(die.split("d")[1]);
            for (let i = 0; i < numberOfDice; i++) {
                dice.push({
                    id: uuidv4(),
                    size: size,
                    rolledNumber: null,
                    isLocked: false
                });
            }
        }
        return dice;
    }

    const addDiceToSet = () => {
        const dice = diceSet.value.replace(/\s/g, "").split("+");
        useDiceStore.setState(produce(state => {
            if (set?.name) {
                state.settings.sets = state.settings.sets.filter((item: DiceSetInt) => { set?.name !== item.name })
            }
            state.settings.sets = [...state.settings.sets, {
                name: setName.value,
                dice: getDice(dice)
            }]
        }))
    };

    return { setName, diceSet, addDiceToSet }
}