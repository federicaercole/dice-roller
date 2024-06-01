import D2wn from "../assets/svg/d2wn.svg"
import D4wn from "../assets/svg/d4wn.svg"
import D6wn from "../assets/svg/d6wn.svg"
import D8wn from "../assets/svg/d8wn.svg"
import D10wn from "../assets/svg/d10wn.svg"
import D12wn from "../assets/svg/d12wn.svg"
import D20wn from "../assets/svg/d20wn.svg"
import D100wn from "../assets/svg/d100wn.svg"
import { DieInt, DiceSetInt } from "./types"

export const maxNumberOfSets = 30;
export const maxNumberOfDice = 99;

export function printDieSVG(dieSize: number): React.ReactNode {
    switch (dieSize) {
        case 2:
            return <D2wn />;
        case 4:
            return <D4wn />;
        case 6:
            return <D6wn />;
        case 8:
            return <D8wn />;
        case 10:
            return <D10wn />;
        case 12:
            return <D12wn />;
        case 20:
            return <D20wn />;
        case 100:
            return <D100wn />;
    }
}

export function countDice(setDice: DieInt[]) {
    const diceSizeMap = setDice.map(item => item.size);
    const diceCount = diceSizeMap.reduce((obj: { [key: number]: number }, item) => {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    }, {})
    return diceCount;
}

export function printDice(setDice: DieInt[]) {
    const obj = countDice(setDice);
    const spanElement = [];
    for (const key in obj) {
        spanElement.push(<span key={`${obj[key]}d${key}`} ><span aria-hidden="true">{obj[key]} x {printDieSVG(Number(key))}</span>
            <span className="visually-hidden">{`${obj[key]}d${key}`}</span>
        </span>);
    }
    return spanElement.map(item => item);
}

export function isSet(set: unknown): set is DiceSetInt {
    return typeof set !== "undefined";
}