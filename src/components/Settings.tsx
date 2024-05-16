import { useDiceStore } from "./DiceStore"
import { produce } from "immer";
import Add from "../assets/svg/add.svg";
import { v4 as uuidv4 } from 'uuid';
import DiceSet from "./DiceSet";
import useFormInput from "./useFormInput";

function Settings() {
    const setName = useFormInput("");
    const diceSet = useFormInput("");

    const { settings } = useDiceStore();
    const toggleVisibility = (value: string) => useDiceStore.setState(produce(state => { state.settings.visibility[value] = !state.settings.visibility[value] }));

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
        <h1>Settings</h1>
        <button type="button" role="switch" aria-checked={settings.visibility.sum} onClick={() => toggleVisibility("sum")}>
            <span className="switch"></span>
            Show sum</button>
        <button type="button" role="switch" aria-checked={settings.visibility.rolls} onClick={() => toggleVisibility("rolls")}>
            <span className="switch"></span>
            Show rolls</button>
        <section>
            <header>
                <h2>Dice Sets</h2>
                <button type="button" ><Add /><span className="visually-hidden">Add a new set</span></button>
                <label htmlFor="name">Set name</label>
                <input type="text" id="name" {...setName} />
                <label htmlFor="dice">Dice (example: 4d6 + 1d8)</label>
                <input type="text" id="dice" {...diceSet} />
                <button type="button" onClick={() => addDiceToSet(diceSet.value)}>Save set</button>
            </header>
            {settings.sets.map((set) => <DiceSet key={set.name} set={set} />)}
        </section >
    </>)
}

export default Settings