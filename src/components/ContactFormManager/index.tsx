import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootReducer } from "../../store";
import { register } from "../../store/reducers/contacts";

function ContactFormManager() {
	const { itens } = useSelector((state: RootReducer) => state.contact);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [telephone, setTelephone] = useState("");

	const registerContact = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(register({ name, email, telephone }));
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
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(evento) => setEmail(evento.target.value)}
					/>
					<input
						type="text"
						placeholder="Telefone"
						value={telephone}
						onChange={(evento) => setTelephone(evento.target.value)}
					/>
					<button type="submit">Cadastrar</button>
				</form>

				<ul>
					{itens.map((c) => (
						<>
							<li key={c.name}>
								{c.name} - {c.email} - {c.telephone}
							</li>
							<button type="submit">Remover</button>
							<button type="submit">Editar</button>
						</>
					))}
				</ul>
			</main>
		</>
	);
}

export default ContactFormManager;
