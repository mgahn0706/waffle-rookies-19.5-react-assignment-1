import { createContext, useContext, useEffect, useState } from 'react'
import request from '../API/API'
import { toast } from 'react-toastify'

const LoginContext = createContext(null)

export const LoginProvider = ({ children }) => {
  const [userToken, setUserToken] = useState()

  useEffect(() => {
    setUserToken(localStorage.getItem('token'))
  }, [])

  const isTokenExpired = () => {
    request
      .get('/auth/check_token')
      .then(() => {})
      .catch(() => {
        logout()
        toast.error('로그인 후 10분이 지나 자동 로그아웃 되었습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const login = (usernameInput, passwordInput) => {
    request
      .post('/auth/login', {
        username: usernameInput,
        password: passwordInput,
      })
      .then((response) => {
        const temp = response.data.access_token
        localStorage.setItem('token', temp)
        setUserToken(temp)
        request.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`
      })
      .catch(() => {
        toast.error('유저네임이나 비밀번호가 잘못되었습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const logout = () => {
    delete request.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    setUserToken(null)
  }

  return (
    <LoginContext.Provider
      value={{ userToken, login, logout, setUserToken, isTokenExpired }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext)
