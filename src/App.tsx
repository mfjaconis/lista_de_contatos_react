import { Provider } from "react-redux";

import ContactFormManager from "./components/ContactFormManager";
import Header from "./components/Header";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<Header />
			<ContactFormManager />
		</Provider>
	);
}

export default App;
