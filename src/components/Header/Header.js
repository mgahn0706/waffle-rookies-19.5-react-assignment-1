import styles from './Header.module.scss'
import { useLoginContext } from '../../Context/LoginContext'
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";


const Header = () => {
    const [login, setGin] = useState();
    const history = useHistory();
    const { logout } = useLoginContext();
    const handleLogOutButton = () => {
      logout()
      history.push('/login')
     //logout 후 로그인 창 이동
  }





  return (
    <div className={styles.Header}>
      <a href="https://wafflestudio.com" target="_blank" rel="noreferrer">
        <img
          src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75"
          alt="waffleLogo"
          className="waffleLogo"
        />
      </a>

      <span className={styles.title}>와플고등학교 명단 관리 프로그램 </span>
      <button className={styles.logOutButton} onClick={handleLogOutButton}>
        로그아웃
      </button>
    </div>
  )
}

export default Header
