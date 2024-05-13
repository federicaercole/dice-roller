export interface DieInt {
    id: number,
    size: number,
    rolledNumber: null | number,
    isLocked: boolean
}

interface Settings {
    visibility: {
        [key: string]: boolean;
    },
}

export interface DiceStore {
    dice: DieInt[],
    numberOfDice: number,
    settings: Settings,
}