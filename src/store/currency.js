import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({

    name: "currency",
    initialState: {
        index: 0,
       
    },

    reducers: {
        changeIndex(state, action) {
            const index = action.payload
            state.index = index

            console.log(state.index)

           
        },

    }
}



)

export const currencyAction = currencySlice.actions
export default currencySlice


