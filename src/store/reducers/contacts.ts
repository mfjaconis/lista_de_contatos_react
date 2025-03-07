import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type Contacts from "../../models/Contacts";

type ContactsStates = {
	itens: Contacts[];
};

const initialState: ContactsStates = {
	itens: [
		{
			name: "Matheus",
			email: "matheusjaconis@gmail.com",
			telephone: "11 987927573",
		},
	],
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		register: (state, action: PayloadAction<Contacts>) => {
			const contactExist = state.itens.find(
				(contact) =>
					contact.name.toLowerCase() === action.payload.name.toLowerCase() ||
					contact.email.toLowerCase() === action.payload.email.toLowerCase() ||
					contact.telephone.replace(/\s+/g, "") ===
						action.payload.telephone.replace(/\s+/g, ""),
			);

			if (contactExist) {
				alert("Esse contato já existe");
			} else {
				const newContact = { ...action.payload };
				state.itens.push(newContact);
			}
		},
	},
});

export const { register } = contactsSlice.actions;

export default contactsSlice.reducer;
