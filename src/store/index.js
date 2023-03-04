


import { configureStore} from "@reduxjs/toolkit"
import currencySlice from "./currency"
import attributeSlice  from "./attribute-slice";

const store = configureStore({
    reducer: {
        currency:currencySlice.reducer,
        attribute:attributeSlice.reducer
    }
});

export default store;

