import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type ContactClass from "../../models/Contacts";
import type { RootReducer } from "../../store";
import { edit, register, remove } from "../../store/reducers/contacts";
import { normalizePhoneNumber } from './../../Masks/masks';


function ContactFormManager() {
	const { itens } = useSelector((state: RootReducer) => state.contact);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");
	const [error, setError] = useState("");
	const [editingContact, setEditingContact] = useState<ContactClass | null>(null);

	const registerContact = (e: React.FormEvent) => {
		e.preventDefault();

		if (telephone.length < 14 || telephone.length > 15) {
			setError("Telefone inválido! Deve ter 10 ou 11 dígitos.");
			return;
		  }

		  if (editingContact) {
			dispatch(edit({ ...editingContact, name, email, telephone }));
		} else {
			dispatch(register({ name, email, telephone }));
		}

		setError("");
		setName("");
		setEmail("");
		setTelephone("");
		setEditingContact(null);
	};

	const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = normalizePhoneNumber(e.target.value);
		setTelephone(formattedPhone);
		
		if (formattedPhone.length >= 14 && formattedPhone.length <= 15) {
		  setError("");
		}
	  };

	  const handleEdit = (contact: ContactClass) => {
		setName(contact.name);
		setEmail(contact.email);
		setTelephone(contact.telephone);
		setEditingContact(contact);
	};

	return (
		<>
			<main>
				<form onSubmit={registerContact}>
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
					{error && <div style={{ color: "red" }}>{error}</div>}
					<button type="submit">{editingContact ? "Salvar alterações" : "Cadastrar"}</button>
				</form>

				<ul>
					{itens.map((c) => (
						<>
							<li key={c.name}>
								{c.name} - {c.email} - {c.telephone}
							</li>
							<button onClick={() => dispatch(remove(c.id))}>Remover</button>
							<button onClick={() => handleEdit(c)}>Editar</button>
						</>
					))}
				</ul>
			</main>
		</>
	);
}

export default ContactFormManager;
