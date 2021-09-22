import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import StudentPage from "../StudentPage/StudentPage";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/students" component={Main}/>
                <Route path="/students/:id" component={StudentPage}/>
                <Redirect to="/students"/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;