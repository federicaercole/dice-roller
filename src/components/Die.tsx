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
import { DieInt } from "./types";
import { useState } from "react";

interface Props {
    die: DieInt,
    dice: DieInt[],
    setDice: (value: React.SetStateAction<DieInt[]>) => void
}

export function Die({ die, dice, setDice }: Props) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    function deleteDie(id: number) {
        setDice(dice.filter(item => id !== item.id));
    }

    function lockDie(id: number) {
        const array = dice.map(item => {
            if (item.id === id) {
                return { ...item, isLocked: !item.isLocked }
            } else {
                return item;
            }
        });
        setDice(array);
    }

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

    return (<li>
        <button type="button" onClick={() => setIsOpened(!isOpened)}>{die.rolledNumber ? die.rolledNumber : "?"} {printDieSVG(die.size)}
            {die.isLocked && <><Lock /><span className="visually-hidden">Locked die</span></>}</button>
        {isOpened && <div className="dropdown">
            <button type="button" onClick={() => lockDie(die.id)}>
                {die.isLocked ? <Unlock /> : <Lock />}
                {die.isLocked ? "Unlock" : "Lock"}
                <span className="visually-hidden">this d{die.size}</span></button>
            <button type="button" onClick={() => deleteDie(die.id)}><Delete /> Delete <span className="visually-hidden">this d{die.size}</span></button>
        </div>}
    </li>)
}