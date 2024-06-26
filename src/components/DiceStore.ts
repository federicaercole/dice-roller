import { create } from 'zustand'
import { DiceStore } from "../components/types";
import { persist } from 'zustand/middleware';

export const initialState: DiceStore = {
    dice: [],
    settings: {
        visibility: {
            sum: true,
            rolls: true,
        },
        sets: [],
        mode: "buttons",
    }
}

export const useDiceStore = create<typeof initialState>()(
    persist(() => (initialState),
        {
            name: "dice",
        }
    )
);