import './Login.css';
import {useLoginContext} from "../../Context/StudentContext"
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import request from "../../API/API";

const Login = () => {

    const history = useHistory();
    const {isLogin, setLogin} = useLoginContext();

    const handleSignInButton  = () => {

        request.post('/auth/login',{
            "username" : usernameInput,
            "password" : passwordInput,
        })
            .then((response)=>{

                localStorage.setItem('token',response.data.access_token)
                setLogin(true);
                request.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
                history.replace('/students')


            })
            .catch(()=>{
                toast.error('유저네임이나 비밀번호가 잘못되었습니다.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })

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