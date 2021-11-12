import { createContext, useContext, useEffect, useState } from 'react';
import request from '../API/API';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

type AccessTokenType = {
  access_token: string;
};

type LogInInputType = {
  username: string;
  password: string;
};
type LoginContextType = {
  userToken: string | null | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
  setUserToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  isTokenExpired: () => void;
};

const LoginContext = createContext<LoginContextType>({} as LoginContextType);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null | undefined>();

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
  }, []);

  const isTokenExpired = () => {
    type TokenResponseType = {
      checked: boolean;
    };

    request
      .get<never, AxiosResponse<TokenResponseType>>('/auth/check_token')
      .catch(() => {
        logout();
        toast.error('로그아웃 되었습니다.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const login = (usernameInput: string, passwordInput: string) => {
    request
      .post<LogInInputType, AxiosResponse<AccessTokenType>>('/auth/login', {
        username: usernameInput,
        password: passwordInput,
      })
      .then((response) => {
        const temp = response.data.access_token;
        localStorage.setItem('token', temp);
        setUserToken(temp);
        // @ts-ignore Authorization 에서는 ignore 을 사용함.
        request.defaults.headers.common[
          // @ts-ignore
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;
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
        });
      });
  };

  const logout = () => {
    // @ts-ignore Authorization 에서는 ignore 을 사용함.
    delete request.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    setUserToken(null);
  };

  return (
    <LoginContext.Provider
      value={{ userToken, login, logout, setUserToken, isTokenExpired }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
