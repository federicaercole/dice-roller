import { useDiceStore } from "./DiceStore"
import { produce } from "immer";
import Add from "../assets/svg/add.svg";
import { printDieSVG } from "./utils";
import useOpenedStatus from "./useOpenedStatus";
import { useRef } from "react";
import Expand from "../assets/svg/expand.svg";
import Delete from "../assets/svg/delete.svg";
import Edit from "../assets/svg/edit.svg";
import Load from "../assets/svg/load.svg";

function Settings() {
    const openedMenu = useRef<HTMLDivElement>(null);
    const clickedBtn = useRef<HTMLButtonElement>(null);

    const { isOpened, setIsOpened } = useOpenedStatus(openedMenu, clickedBtn);
    const { settings } = useDiceStore();
    const toggleVisibility = (value: string) => useDiceStore.setState(produce(state => { state.settings.visibility[value] = !state.settings.visibility[value] }));

    function countDice() {
        const diceSizeMap = settings.sets.flatMap(item => item.dice.flatMap(item => item.size));
        const diceCount = diceSizeMap.reduce((obj: { [key: string]: number }, item) => {
            if (!obj[item]) {
                obj[item] = 0;
            }
            obj[item]++;
            return obj;
        }, {})
        return diceCount;
    }

    function printDice() {
        const obj = countDice();
        for (const key in obj) {
            return (<span aria-hidden="true" aria-label={`${obj[key]}d${key}`}>{obj[key]} x {printDieSVG(Number(key))}</span>)
        }
    }

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
                <button type="button"><Add /><span className="visually-hidden">Add a new set</span></button>
            </header>
            {settings.sets.map((set) =>
                <article key={set.name}>
                    <header><h3>{set.name}</h3>
                        <button type="button" onClick={() => setIsOpened(!isOpened)} ref={clickedBtn}
                            className="expand" aria-haspopup="true" aria-expanded={isOpened} aria-controls={set.name.toLowerCase().replace(/\s+/g, "-")} aria-label="Expand for more options"><Expand /></button>
                        {isOpened && <div className="dropdown" id={set.name.toLowerCase().replace(/\s+/g, "-")} ref={openedMenu}>
                            <button type="button" ><Load /> Load <span className="visually-hidden">{set.name}</span></button>
                            <button type="button" ><Edit /> Edit <span className="visually-hidden">{set.name}</span></button>
                            <button type="button" ><Delete /> Delete <span className="visually-hidden">{set.name}</span></button>
                        </div>}
                    </header>
                    <div>
                        {printDice()}
                    </div>
                </article>)}
        </section>
    </>)
}

export default Settings