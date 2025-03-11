import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type ConctactClass from "../../models/Contacts";
import type { RootReducer } from "../../store";
import { register, remove } from "../../store/reducers/contacts";
import { normalizePhoneNumber } from './../../Masks/masks';

type Porps = ConctactClass;

function ContactFormManager() {
	const { itens } = useSelector((state: RootReducer) => state.contact);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");
	const [error, setError] = useState("");

	const registerContact = (e: React.FormEvent) => {
		e.preventDefault();

		if (telephone.length < 14 || telephone.length > 15) {
			setError("Telefone inválido! Deve ter 10 ou 11 dígitos.");
			return;
		  }

		dispatch(register({ name, email, telephone }));
		setError("");
	};

	const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = normalizePhoneNumber(e.target.value);
		setTelephone(formattedPhone);
		
		if (formattedPhone.length >= 14 && formattedPhone.length <= 15) {
		  setError("");
		}
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
					<button type="submit">Cadastrar</button>
				</form>

				<ul>
					{itens.map((c) => (
						<>
							<li key={c.name}>
								{c.name} - {c.email} - {c.telephone}
							</li>
							<button onClick={() => dispatch(remove(c.id))}>Remover</button>
							<button>Editar</button>
						</>
					))}
				</ul>
			</main>
		</>
	);
}

export default ContactFormManager;
