import './Login.css';
import {useLoginContext} from "../../Context/StudentContext"
import {useState} from "react";
import {toast} from "react-toastify";


const Login = () => {


    const {login} = useLoginContext();

    const handleSignInButton  = () => {
        login(usernameInput,passwordInput);
    }



    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');


    const handleUserInput = (e) => {
        setUsernameInput(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    }

    const handleNotUpdated = () =>{
        toast.error('아직 준비되지 않은 기능입니다.', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
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
                <input className="usernameInput" onChange={(e) => {handleUserInput(e)}}/>
                <div className="passwordText">
                    <span>Password</span>
                    <span className="forgotPasswordLink" onClick={()=>handleNotUpdated()}>Forgot Password?</span>
                </div>
                <input className="passwordInput" type="password" onChange={(e)=>{handlePasswordInput(e)}}/>
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