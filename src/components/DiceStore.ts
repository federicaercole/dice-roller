import { create } from 'zustand'
import { DiceStore } from "../components/types";
import { persist } from 'zustand/middleware';

const initialState: DiceStore = {
    dice: [],
    numberOfDice: 0,
}

export const useDiceStore = create<typeof initialState>()(
    persist(() => (initialState),
        {
            name: "dice",
            partialize: (state) => ({ dice: state.dice }),
        }
    )
);