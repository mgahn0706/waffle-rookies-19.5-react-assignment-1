import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Main from '../Main/Main'
import StudentPage from '../StudentPage/StudentPage'
import Login from '../Login/Login'
import { useLoginContext } from '../../Context/LoginContext'
import request from '../../API/API'

const Routes = () => {
  const { userToken } = useLoginContext()

  if (userToken) {
    request.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
  }

  if (userToken === undefined) {
    return null
  }

  if (userToken === null) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/students" component={Main} />
        <Route path="/student/:id" component={StudentPage} />
        <Redirect to="/students" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
