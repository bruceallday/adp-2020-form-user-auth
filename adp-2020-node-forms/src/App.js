import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Login from './login/login-component'
import Signup from './sign-up/sign-up.component'
import Cats from './cats/cats.component'
import Home from './home/home.component'

const App = () => (
    <Router>
        <Switch>

            <Route path="/" exact>
                <Home/>
            </Route>

             <Route path="/login">
                <Login />
            </Route>

            <Route path="/signup">
                <Signup />
            </Route>

            <Route path="/cats">
                <Cats />
            </Route>

        </Switch>
    </Router>
)

export default App