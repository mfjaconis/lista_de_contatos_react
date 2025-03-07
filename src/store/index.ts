import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./reducers/contacts";

const store = configureStore({
	reducer: {
		contact: contactsReducer,
	},
});

export type RootReducer = ReturnType<typeof store.getState>;

export default store;
