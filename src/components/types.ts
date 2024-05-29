export interface DieInt {
    id: string,
    size: number,
    rolledNumber: null | number,
    isLocked: boolean
}
export interface DiceSetInt {
    name: string,
    dice: DieInt[],
}
interface Settings {
    visibility: {
        [key: string]: boolean;
    },
    sets: DiceSetInt[]
    mode: "buttons" | "input";
}
export interface DiceStore {
    dice: DieInt[],
    settings: Settings,
}
export interface ModalInt {
    modal: string,
    set?: DiceSetInt,
}

export type MessageOutletContext = [message: string, setMessage: React.Dispatch<React.SetStateAction<string>>];