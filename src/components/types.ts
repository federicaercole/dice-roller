export interface DieInt {
    id: number,
    size: number,
    rolledNumber: null | number,
    isLocked: boolean
}

export interface DiceStore {
    dice: DieInt[],
    numberOfDice: number,
}