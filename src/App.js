import './App.css';
import Routes from "./components/Routes/Routes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {CookiesProvider} from "react-cookie";
function App() {

  return (
            <div className="App">
                <CookiesProvider/>
                <ToastContainer/>
                <Routes />
            </div>
  );
}

export default App;
