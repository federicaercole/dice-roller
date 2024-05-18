import { v4 as uuidv4 } from 'uuid';
import { useDiceStore } from "./DiceStore";
import { produce } from "immer";
import useFormInput from "./useFormInput";
import { DiceSetInt, DieInt } from './types';

interface ModalProps {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    set?: DiceSetInt,
    setRef: (element: HTMLButtonElement) => void,
}

export function AddNewModal({ setRef, setIsOpened }: ModalProps) {
    const setName = useFormInput("");
    const diceSet = useFormInput("");

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

    const addDiceToSet = (size: string) => {
        const dice = size.replace(/\s/g, "").split("+");
        useDiceStore.setState(produce(state => {
            state.settings.sets = [...state.settings.sets, {
                name: setName.value,
                dice: getDice(dice)
            }]
        }))
    };

    return (<>
        <label htmlFor="name">Set name</label>
        <input type="text" id="name" {...setName} />
        <label htmlFor="dice">Dice (example: 4d6 + 1d8)</label>
        <input type="text" id="dice" {...diceSet} />
        <button type="button" ref={setRef} onClick={() => { addDiceToSet(diceSet.value); setIsOpened(false) }}>Save set</button>
    </>)
}

export function LoadModal({ setIsOpened, set, setRef }: ModalProps) {
    const loadDiceSet = (setDice: DieInt[]) => useDiceStore.setState(state => ({ dice: state.dice = setDice }));

    return (<>
        <p>Do you want to load this set?</p>
        <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >Cancel</button>
        <button type="button" ref={setRef} onClick={() => { loadDiceSet(set!.dice); setIsOpened(false) }} >Yes</button>
    </>)
}

export function DeleteModal({ setIsOpened, set, setRef }: ModalProps) {
    const deleteDiceSet = (setName: string) => useDiceStore.setState(produce(state => { state.settings.sets = state.settings.sets.filter((set: DiceSetInt) => set.name !== setName) }));

    return (<>
        <p>It will be gone forever!</p>
        <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >Cancel</button>
        <button type="button" ref={setRef} onClick={() => { deleteDiceSet(set!.name); setIsOpened(false) }} >Yes</button>
    </>)
}