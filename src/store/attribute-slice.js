import { createSlice } from "@reduxjs/toolkit";


const attributeSlice = createSlice({
    name: "attribute",
    initialState: {

        valueList: {},
        itemsList: []

    },

    reducers: {
        chooseAttribute(state, action) {
            // const {attributeId , itemId} = action.payload
            const { attributeId, value} = action.payload;
           
            // const newValue = action.payload;


            state.valueList[attributeId] = value;


            // const index = state.valueList.findIndex((item) => item.value === newValue.value);
            // const existingItem = state.valueList.find((item) => item === newValue);

            // if (Array.isArray(state.valueList)) {
            //     state.valueList.push(newValue)
            // }
            // else {
            //     state.valueList = [newValue]
            // }

           

            // console.log(id)
            // return {
            //     ...state,
            //     valueList: {
            //         ...state.valueList,
            //         [id]: { value }
            //     }
            // }



        },

        //     addValueList (state , action) {
        //         const newitem = action.payload
        //         console.log(newitem.id)
        //         const existingItem = state.itemsList.find((item) => item.id === newitem);

        //         if(existingItem) {
        //             existingItem.quantity++

        //         }   

        // },


        addToCart(state, action) {
            const newItem = action.payload
            state.valueList = newItem
            console.log(state.valueList)


            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            // if (existingItem) {

            //     existingItem.quantity++
            //     existingItem.totalPrice += newItem.price

            // } else {
            //     state.itemsList.push({
            //         id: newItem.id,
            //         value: newItem.value

            //     })


            // }



        }



    }

})

export const cartActions = attributeSlice.actions
export default attributeSlice