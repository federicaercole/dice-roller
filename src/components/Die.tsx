import D2 from "../assets/svg/d2.svg";
import D4 from "../assets/svg/d4.svg";
import D6 from "../assets/svg/d6.svg";
import D8 from "../assets/svg/d8.svg";
import D10 from "../assets/svg/d10.svg";
import D12 from "../assets/svg/d12.svg";
import D20 from "../assets/svg/d20.svg";
import Delete from "../assets/svg/delete.svg";
import Lock from "../assets/svg/lock.svg";
import Unlock from "../assets/svg/unlock.svg";
import Expand from "../assets/svg/expand.svg";
import { DieInt } from "./types";
import useOpenStatus from "./useOpenStatus";
import { useDiceStore } from "./DiceStore";
import { useRef } from "react";
interface Props {
    die: DieInt,
}

export function Die({ die }: Props) {
    const openMenu = useRef<HTMLDivElement>(null);
    const clickedBtn = useRef<HTMLButtonElement>(null);

    const { isOpen, setIsOpen } = useOpenStatus(openMenu, clickedBtn);

    const deleteDie = (id: string) => useDiceStore.setState(state => ({ dice: state.dice.filter(item => id !== item.id) }));
    const lockDie = (id: string) => useDiceStore.setState(state => ({
        dice: state.dice.map(item => {
            if (item.id === id) {
                return { ...item, isLocked: !item.isLocked };
            }
            return item;
        })
    }));

    function printDieSVG(dieSize: number): React.ReactNode {
        switch (dieSize) {
            case 2:
                return <D2 />;
            case 4:
                return <D4 />;
            case 6:
                return <D6 />;
            case 8:
                return <D8 />;
            case 10:
            case 100:
                return <D10 />;
            case 12:
                return <D12 />;
            case 20:
                return <D20 />;
        }
    }

    return (<>
        <li>
            <span aria-hidden="true">{die.rolledNumber ? die.rolledNumber : "?"} {printDieSVG(die.size)}</span>
            <span className="visually-hidden">{die.rolledNumber ? `Rolled a ${die.rolledNumber} on a d${die.size}` : `d${die.size} unrolled`} </span>
            {die.isLocked && <><Lock /><span className="visually-hidden">This d{die.size} is locked</span></>}
            <button type="button" onClick={() => setIsOpen(!isOpen)} ref={clickedBtn}
                className="expand" aria-haspopup="true" aria-expanded={isOpen} aria-controls={`die-${die.id}-ctrl`} aria-label={`Expand for more options for this d${die.size}`}><Expand /></button>
        </li>
        {isOpen && <div className="dropdown" id={`die-${die.id}-ctrl`} ref={openMenu}>
            <button type="button" onClick={() => lockDie(die.id)}>
                {die.isLocked ? <Unlock /> : <Lock />}
                {die.isLocked ? "Unlock" : "Lock"} <span className="visually-hidden">this d{die.size}</span></button>
            <button type="button" onClick={() => deleteDie(die.id)}><Delete /> Delete <span className="visually-hidden">this d{die.size}</span></button>
        </div>}
    </>)
}