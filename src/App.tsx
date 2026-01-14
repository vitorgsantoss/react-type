import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import { GlobalStyle } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}


export default App;