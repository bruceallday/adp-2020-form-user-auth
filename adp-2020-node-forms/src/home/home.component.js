import React from 'react'
import { Typography, Button } from '@material-ui/core'
import {
    Link,
    useHistory
} from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    const csrfToken = localStorage.getItem('csrfToken')
    const isLoggedIn = csrfToken !== null

    return(
        <div>
            {isLoggedIn && (
                <div>
                    <Typography>
                        You are authorised to see the cats 
                    </Typography>
                    <Button
                    variant='contained'
                    onClick={() => {
                        localStorage.removeItem('csrfToken')
                        history.push('/')
                    }}>
                    Log Out
                    </Button>
                </div>
            )}
            {!isLoggedIn && (
                <div>
                    <h4>Index</h4>
                    <Link to='/login' >
                        <Typography>
                            Log in
                        </Typography>
                    </Link>
                    <Link to='/signup' >
                        <Typography>
                            Sign up
                        </Typography>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Home