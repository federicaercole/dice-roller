import { useDiceStore } from "./DiceStore";
import { DiceSetInt } from "./types";
import { maxNumberOfDice } from "./utils";

export function useValidateForm(diceInput: string, nameInput?: string, set?: DiceSetInt) {
    const { settings } = useDiceStore();

    function findSet(name: string) {
        return settings.sets.find(item => item.name === name && item !== set);
    }

    function countTotalDice(set: string) {
        const dice = set.split("+").map(die => Number(die.split("d")[0]));
        return dice.reduce((acc, curr) => acc + curr);
    }

    const errors: { [key: string]: string } = {};

    if (nameInput || nameInput === "") {
        if (!nameInput.trim()) {
            errors.name = "Name of the set is required";
        } else if (findSet(nameInput.trim())) {
            errors.name = "A set with this name already exists. Please write another name";
        }
    }

    const regex = /^(\b([1-9][0-9]?)[dD](20|2|4|6|8|12|100|10)[+]?\b)+$/g;
    if (!diceInput.trim()) {
        errors.dice = "Dice set field is required";
    } else if (!regex.test(diceInput.trim())) {
        errors.dice = "Write the correct format with a plus sign between the dice, for example 1d6+2d20";
    } else if (countTotalDice(diceInput.trim()) > maxNumberOfDice) {
        errors.dice = `Write a set with a maximum of ${maxNumberOfDice} dice in total`;
    }

    return errors;
}