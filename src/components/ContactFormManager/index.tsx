import { useSelector } from "react-redux";

import type { RootReducer } from "../../store";

function ContactFormManager() {
	const { itens } = useSelector((state: RootReducer) => state.contact);
	return (
		<>
			<main>
				<form>
					<input type="text" placeholder="Nome completo" />
					<input type="email" placeholder="E-mail" />
					<input type="text" placeholder="Telefone" />
				</form>
				<button type="submit">Cadastrar</button>
				<button type="submit">Remover</button>
				<button type="submit">Editar</button>
				<ul>
					{itens.map((c) => (
						<li key={c.name}>
							{c.name} - {c.email} - {c.telephone}
						</li>
					))}
				</ul>
			</main>
		</>
	);
}

export default ContactFormManager;
