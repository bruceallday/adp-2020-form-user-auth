import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Login from './login/login-component'

const App = () => (
    <Router>
        <Switch>

            <Route path="/" exact>
                <div>
                     <h2>
                        INDEX
                     </h2>
                    <Link to="/login">
                        LOG IN
                    </Link>
                </div>
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/cats/">
                CATS
            </Route>

        </Switch>
    </Router>
)

export default App