import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Main from '../Main/Main'
import StudentPage from '../StudentPage/StudentPage'
import Login from '../Login/Login'
import { useLoginContext } from '../../Context/AuthContext'
import request from '../../API/API'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Routes = () => {
  const { userToken } = useLoginContext()

  useEffect(() => {
    if (userToken) {
      request.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    }
  })

  return (
    <BrowserRouter>
      <Switch>
        {userToken ? (
          <>
            <Route path="/students" component={Main} />
            <Route path="/student/:id" component={StudentPage} />
            <Redirect to="/students" />
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
