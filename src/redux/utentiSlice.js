import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plebei: [],
};

const utentiSlice = createSlice({
    name: "utenti",
    initialState,
    reducers: {
        addGold: (state, { payload }) => {
            state.plebei = payload;

        },
    },
});

export const { addGold } = utentiSlice.actions;
export const getAllUtenti = (state) => state.utenti.utenti
export default utentiSlice.reducer