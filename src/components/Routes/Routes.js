import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import StudentPage from "../StudentPage/StudentPage";
import Login from "../Login/Login"
import {useLoginContext} from "../../Context/StudentContext";


const Routes = () => {
    const {isLogin} = useLoginContext(); /*login 상태를 저장하는 함수 새로고침시 state 가 날아가므로 일단 임시방편*/

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/student/:id" component={StudentPage}/>
                {isLogin? <Route path="/students" component={Main}/> : <Route path="/login" component={Login}/>}
                <Route path="/login" component={Login}/>
                {isLogin? <Redirect to="/students"/> : <Redirect to="/login"/>}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;