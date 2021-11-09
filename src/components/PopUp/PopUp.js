import './PopUp.css'
import PopUpImg from '../../image/PopUpImage.png'
import { Cookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import styled from "styled-components"



const PopUp = () => {
  const cookie = new Cookies()
  const [isPopVisible, setPopVisible] = useState(true)
  const date = new Date()
  date.setHours(date.getHours() + 24)

  useEffect(() => {
    if (cookie.get('cookie')) {
      setPopVisible(false)
    } else {
      setPopVisible(true)
    }
  }, [])

  const handleCloseButton = () => {
    setPopVisible(false)
  }

  const handleDisableButton = () => {
    cookie.set('cookie', 'popUp', { expires: date })
    setPopVisible(false)
  }




  return (
    <div className={'popUpWrapper' + (isPopVisible ? 'Visible' : '')}>
      <div className="popUp">
        <img src={PopUpImg} alt="팝업 이미지" />
        <button className="disableButton" onClick={handleDisableButton}>
          24시간동안 보지 않기
        </button>
        <button className="closePopButton" onClick={handleCloseButton}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default PopUp
