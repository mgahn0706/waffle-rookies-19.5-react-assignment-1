import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import StudentPage from "../StudentPage/StudentPage";
import Login from "../Login/Login"
import {useLoginContext} from "../../Context/StudentContext";
import request from "../../API/API";
import {useEffect} from "react";



const Routes = () => {

    const {userToken, setUserToken} = useLoginContext();
    useEffect(()=>{setUserToken(localStorage.getItem('token'))},[])
     //앱이 새롭게 켜졌을 때를 대비함
    if(userToken){
        request.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    }

    return (
        <BrowserRouter>
            <Switch>
                {userToken? <Route path="/students" component={Main} /> : <Route path="/login" component={Login}/>}
                {userToken? <Route path="/student/:id" component={StudentPage}/> : <Redirect to="/login"/>}
                {userToken? <Redirect to="/students"/> : <Route path="/login" component={Login}/>}

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;