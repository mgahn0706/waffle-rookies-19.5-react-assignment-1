import {createContext, useContext, useState} from "react";



const LoginContext = createContext(false);


export const LoginProvider = ({children}) => {

    const [isLogin, setLogin] = useState(false);



    return (
        <LoginContext.Provider value={{isLogin, setLogin}}>
            {children}
        </LoginContext.Provider>
    )
};

export const useLoginContext = () => useContext(LoginContext);
