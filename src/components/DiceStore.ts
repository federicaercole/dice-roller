import { create } from 'zustand'
import { DiceStore } from "../components/types";
import { persist } from 'zustand/middleware';

const initialState: DiceStore = {
    dice: [],
    numberOfDice: 0,
    settings: {
        visibility: {
            sum: true,
            rolls: true,
        },
    }
}

export const useDiceStore = create<typeof initialState>()(
    persist(() => (initialState),
        {
            name: "dice",
            partialize: state =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !['numberOfDice'].includes(key)),
                ),
        }
    )
);