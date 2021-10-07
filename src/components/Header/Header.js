import "./Header.css";
import request from "../../API/API";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
const Header = () => {
    const history = useHistory();
    const handleLogOutButton = () => {
        delete request.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        history.push('/login');
    }




    return (
        <div className="Header" >
            <a href="https://wafflestudio.com" target="_blank" rel="noreferrer">
                <img src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75" alt="waffleLogo" className={"waffleLogo"}/>

            </a>

            <span className="title">와플고등학교 명단 관리 프로그램 </span>
            <button className="logOutButton" onClick={handleLogOutButton}>로그아웃</button>

        </div>
    );
}

export default Header;