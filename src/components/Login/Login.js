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

    const handleNotUpdated = () =>{
        window.alert('Not updated yet :(')
    }

    return(



        <div className="loginWrapper">

            <a href="https://wafflestudio.com" target="_blank" rel="noreferrer" className="signInHeader">
                <img src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75" alt="waffleLogo" className="waffleLogo"/>
            </a>
            <div className="signInTitle">
                Sign in to WaffleHighSchool
            </div>
            <div className="loginBox">
                <div className="usernameText">
                    Username or email address
                </div>
                <input className="usernameInput"/>
                <div className="passwordText">
                    <span>Password</span>
                    <span className="forgotPasswordLink" onClick={()=>handleNotUpdated()}>Forgot Password?</span>
                </div>
                <input className="passwordInput" type="password"/>
                <div className="signInButtonWrapper">
                    <button className="signInButton" onClick={()=>handleSignInButton()}>Sign in</button>
                </div>

            </div>

            <div className="signUpBox">
                <span>New to Waffle High school?</span>
                <span className="createAccountLink" onClick={()=>handleNotUpdated()}>Create an account.</span>
            </div>

            <footer className="footer">
                <span>Terms</span>
                <span>Privacy</span>
                <span>Security</span>
                <span>Contact</span>
            </footer>

        </div>




    );


}

export default Login;