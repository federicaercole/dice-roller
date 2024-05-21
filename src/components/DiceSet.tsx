import useOpenedStatus from "./useOpenedStatus";
import { useRef } from "react";
import Expand from "../assets/svg/expand.svg";
import Delete from "../assets/svg/delete.svg";
import Edit from "../assets/svg/edit.svg";
import Load from "../assets/svg/load.svg";
import { printDieSVG } from "./utils";
import { DiceSetInt, DieInt, ModalInt } from "./types";
import { countDice } from "./utils";

interface Props {
    set: DiceSetInt,
    setModalContent: React.Dispatch<React.SetStateAction<ModalInt>>,
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

function DiceSet({ set, setModalContent, setIsModalOpened }: Props) {
    const openedMenu = useRef<HTMLDivElement>(null);
    const clickedBtn = useRef<HTMLButtonElement>(null);
    const { isOpened, setIsOpened } = useOpenedStatus(openedMenu, clickedBtn);

    function printDice(setDice: DieInt[]) {
        const obj = countDice(setDice);
        const spanElement = [];
        for (const key in obj) {
            spanElement.push(<span key={`${obj[key]}d${key}`} aria-hidden="true" aria-label={`${obj[key]}d${key}`}>{obj[key]} x {printDieSVG(Number(key))}</span>);
        }
        return spanElement.map(item => item);
    }

    return (<article>
        <header><h3>{set.name}</h3>
            <button type="button" onClick={() => setIsOpened(!isOpened)} ref={clickedBtn}
                className="expand" aria-haspopup="true" aria-expanded={isOpened} aria-controls={set.name.toLowerCase().replace(/\s+/g, "-")} aria-label="Expand for more options"><Expand /></button>
            {isOpened && <div className="dropdown" id={set.name.toLowerCase().replace(/\s+/g, "-")} ref={openedMenu}>
                <button type="button" onClick={() => { setIsModalOpened(true); setModalContent({ modal: "load", set: set }) }} ><Load /> Load <span className="visually-hidden">{set.name}</span></button>
                <button type="button" onClick={() => { setIsModalOpened(true); setModalContent({ modal: "edit", set: set }) }}><Edit /> Edit <span className="visually-hidden">{set.name}</span></button>
                <button type="button" onClick={() => { setIsModalOpened(true); setModalContent({ modal: "delete", set: set }) }}><Delete /> Delete <span className="visually-hidden">{set.name}</span></button>
            </div>}
        </header>
        <div>
            {printDice(set.dice)}
        </div>
    </article>)
}

export default DiceSet