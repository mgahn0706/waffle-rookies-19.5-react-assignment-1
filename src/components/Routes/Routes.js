import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import StudentPage from "../StudentPage/StudentPage";
import Login from "../Login/Login"
import {useLoginContext} from "../../Context/StudentContext";
import {useEffect, useState} from "react";


const Routes = () => {



    const token = localStorage.getItem('token')




    return (
        <BrowserRouter>
            <Switch>
                {token? <Route path="/students" component={Main} /> : <Route path="/login" component={Login}/>}
                {token? <Route path="/student/:id" component={StudentPage}/> : <Redirect to="/login"/>}
                {token? <Redirect to="/students"/> : <Route path="/login" component={Login}/>}

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;