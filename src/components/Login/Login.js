import './Login.css';
import {useLoginContext} from "../../Context/StudentContext";
import {useHistory} from "react-router-dom";


const Login = () => {

    const history = useHistory();
    const {setLogin} = useLoginContext();
    const handleSignInButton  = () => {
        setLogin(true);
        history.replace('/students')
    }

    return(

        <div className="loginWrapper">
            Sign in to WaffleHighSchool
            <div className="loginBox">
                Username or email address
                <input className="userName"/>
                Password
                <input className="password"/>

                <button className="signIn" onClick={()=>handleSignInButton()}>Sign in</button>
            </div>

        </div>


    );


}

export default Login;