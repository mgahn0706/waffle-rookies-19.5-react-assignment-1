import {createContext, useContext, useState} from "react";



const LoginContext = createContext(false);


export const LoginProvider = ({children}) => {

    const [isLogin, setLogin] = useState(false);

    const [loginToken, setLoginToken] = useState();



    return (
                    <LoginContext.Provider value={{isLogin, setLogin, setLoginToken, loginToken}}>
                        {children}
                    </LoginContext.Provider>
    )
};

export const useLoginContext = () => useContext(LoginContext);
