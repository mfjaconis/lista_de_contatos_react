import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type Contacts from "../../models/Contacts";

type ContactsStates = {
	itens: Contacts[];
};

const initialState: ContactsStates = {
	itens: [
		{
			id: 1,
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
		remove: (state, action: PayloadAction<number>) => {
			state.itens = [
				...state.itens.filter((contact) => contact.id !== action.payload),
			];
		},
		register: (state, action: PayloadAction<Omit<Contacts, "id">>) => {
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
				const lastContact = state.itens[state.itens.length - 1];

				const newContact = {
					...action.payload,
					id: lastContact ? lastContact.id + 1 : 1,
				};

				state.itens.push(newContact);
			}
		},
		edit: (state, action: PayloadAction<Contacts>) => {
			const indexContact = state.itens.findIndex(
				(contact) => contact.id === action.payload.id,
			);

			if (indexContact >= 0) {
				state.itens[indexContact] = action.payload;
			}
		},
	},
});

export const { register, remove, edit } = contactsSlice.actions;

export default contactsSlice.reducer;
