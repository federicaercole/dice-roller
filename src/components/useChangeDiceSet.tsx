import { v4 as uuidv4 } from 'uuid';
import useFormInput from "./useFormInput";
import { produce } from "immer";
import { useDiceStore } from "./DiceStore";
import { DiceSetInt, DieInt } from './types';
import { countDice, isSet } from './utils';

export function useChangeDiceSet(set?: DiceSetInt) {
    const setName = useFormInput(set?.name ?? "");
    const diceSet = useFormInput(getDiceStringFormat());

    function getDiceStringFormat() {
        if (isSet(set)) {
            const obj = countDice(set.dice);
            const elements = [];
            for (const key in obj) {
                elements.push(`${obj[key]}d${key}`);
            }
            return elements.join("+")
        }
        return "";
    }

    function getDice(diceSizes: string[]) {
        const dice: DieInt[] = [];
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

    const addDiceInHome = () => {
        const dice = diceSet.value.trim().split("+");
        useDiceStore.setState(produce(state => {
            state.dice = getDice(dice);
        }))
    };

    const addDiceToSet = () => {
        const dice = diceSet.value.trim().split("+");
        if (isSet(set) && set.name != "") {
            useDiceStore.setState(produce(state => {
                state.settings.sets = state.settings.sets.map((item: DiceSetInt) => {
                    if (item.name === set.name) {
                        return {
                            name: setName.value,
                            dice: getDice(dice)
                        };
                    }
                    return item;
                })
            }))
        } else {
            useDiceStore.setState(produce(state => {
                state.settings.sets = [...state.settings.sets, {
                    name: setName.value,
                    dice: getDice(dice)
                }]
            }))
        }
    };

    return { setName, diceSet, addDiceToSet, addDiceInHome }
}