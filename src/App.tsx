import { Provider } from "react-redux";

import ContactFormManager from "./components/ContactFormManager";
import Header from "./components/Header";
import store from "./store";
import EstiloGlobal, { Container } from "./styles";

function App() {
	return (
		<Provider store={store}>
			<EstiloGlobal />
			<Container>
				<Header />
				<ContactFormManager />
			</Container>
		</Provider>
	);
}

export default App;
