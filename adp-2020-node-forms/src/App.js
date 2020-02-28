import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Login from './login/login-component'
import Signup from './sign-up/sign-up.component'

const App = () => (
    <Router>
        <Switch>

            <Route path="/" exact>
                <div>
                     <h2>
                        INDEX
                     </h2>

                    <h5>
                        <Link to="/login">
                            LOG IN
                        </Link>
                    </h5> 

                    <h5>
                        <Link to="/signup">
                            SIGN UP
                        </Link>
                    </h5>

                </div>
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/signup">
                <Signup />
            </Route>

            <Route path="/cats/">
                CATS
            </Route>

        </Switch>
    </Router>
)

export default App