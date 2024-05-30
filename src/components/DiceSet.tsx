import useOpenStatus from "./useOpenStatus";
import { useRef } from "react";
import Expand from "../assets/svg/expand.svg";
import Delete from "../assets/svg/delete.svg";
import Edit from "../assets/svg/edit.svg";
import Load from "../assets/svg/load.svg";
import { DiceSetInt, ModalInt } from "./types";
import { printDice } from "./utils";

interface Props {
    set: DiceSetInt,
    openModal: (modal: ModalInt) => void
}

function DiceSet({ set, openModal }: Props) {
    const openMenu = useRef<HTMLDivElement>(null);
    const clickedBtn = useRef<HTMLButtonElement>(null);
    const { isOpen, setIsOpen } = useOpenStatus(openMenu, clickedBtn);

    return (<article>
        <header><h3>{set.name}</h3>
            <button type="button" onClick={() => setIsOpen(!isOpen)} ref={clickedBtn}
                className="expand" aria-haspopup="true" aria-expanded={isOpen} aria-controls={set.name.toLowerCase().replace(/\s+/g, "-")} aria-label="Expand for more options"><Expand /></button>
            {isOpen && <div className="dropdown" id={set.name.toLowerCase().replace(/\s+/g, "-")} ref={openMenu}>
                <button type="button" onClick={() => openModal({ modal: "load", set: set })} ><Load /> Load <span className="visually-hidden">{set.name}</span></button>
                <button type="button" onClick={() => openModal({ modal: "edit", set: set })}><Edit /> Edit <span className="visually-hidden">{set.name}</span></button>
                <button type="button" onClick={() => openModal({ modal: "delete", set: set })}><Delete /> Delete <span className="visually-hidden">{set.name}</span></button>
            </div>}
        </header>
        <div className="dice-summary">
            {printDice(set.dice)}
        </div>
    </article>)
}

export default DiceSet