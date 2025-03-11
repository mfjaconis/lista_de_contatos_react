import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type ContactClass from "../../models/Contacts";
import type { RootReducer } from "../../store";
import { edit, register, remove } from "../../store/reducers/contacts";
import { normalizePhoneNumber } from "./../../Masks/masks";
import { Buttton, Form, List, Main, Span } from "./styles";

function ContactFormManager() {
	const { itens } = useSelector((state: RootReducer) => state.contact);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");
	const [editingContact, setEditingContact] = useState<ContactClass | null>(
		null,
	);

	const registerContact = (e: React.FormEvent) => {
		e.preventDefault();

		if (telephone.length < 14 || telephone.length > 15) {
			alert("Telefone inválido! Deve ter 10 ou 11 dígitos.");
			return;
		}

		const nameParts = name.trim().split(" ");
		if (nameParts.length < 2) {
			alert("Por favor, insira pelo menos um sobrenome.");
			return;
		}

		if (editingContact) {
			dispatch(edit({ ...editingContact, name, email, telephone }));
		} else {
			dispatch(register({ name, email, telephone }));
		}

		setName("");
		setEmail("");
		setTelephone("");
		setEditingContact(null);
	};

	const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = normalizePhoneNumber(e.target.value);
		setTelephone(formattedPhone);
	};

	const handleEdit = (contact: ContactClass) => {
		setName(contact.name);
		setEmail(contact.email);
		setTelephone(contact.telephone);
		setEditingContact(contact);
	};

	return (
		<>
			<Main>
				<Form onSubmit={registerContact}>
					<input
						type="text"
						placeholder="Nome completo"
						value={name}
						onChange={(evento) => setName(evento.target.value)}
						required
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(evento) => setEmail(evento.target.value)}
						required
					/>
					<input
						type="text"
						placeholder="Telefone"
						value={telephone}
						onChange={handleTelephoneChange}
						required
					/>
					<Buttton type="submit">
						{editingContact ? "Salvar alterações" : "Cadastrar"}
					</Buttton>
				</Form>

				<List>
					{itens.map((c) => (
						<>
							<li key={c.name}>
								<Span>Nome: </Span>
								{c.name} - <Span>E-mail: </Span> {c.email} -{" "}
								<Span>Telefone</Span> {c.telephone}
								<Buttton onClick={() => dispatch(remove(c.id))}>
									Remover
								</Buttton>
								<Buttton onClick={() => handleEdit(c)}>Editar</Buttton>
							</li>
						</>
					))}
				</List>
			</Main>
		</>
	);
}

export default ContactFormManager;
