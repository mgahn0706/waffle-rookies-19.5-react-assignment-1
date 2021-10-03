import './App.css';
import Routes from "./components/Routes/Routes";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
            <div className="App">
                <ToastContainer/>
                <Routes />
            </div>
  );
}

export default App;
