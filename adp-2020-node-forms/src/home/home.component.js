import React from 'react'
import { Typography, Button, AppBar, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import {
    Link,
    useHistory
} from 'react-router-dom'

import { useStyles } from './home.styles'

const Home = () => {
    const styles = useStyles()
    const history = useHistory()
    const csrfToken = localStorage.getItem('csrfToken')
    const isLoggedIn = csrfToken !== null

    return(
        <div>
            {isLoggedIn && (
                <div>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Link
                            to='/'
                            variant='contained'
                            className={styles.links}
                            onClick={() => {
                                localStorage.removeItem('csrfToken')
                                history.push('/')
                            }}>
                            <Typography>
                                Log Out
                            </Typography>
                        </Link>
                        <Link to='/cats' className={styles.links}>
                            <Typography>
                                Show me the cats
                            </Typography>
                        </Link>
                    
                    </Toolbar>
                </AppBar>

                </div>
            )}
            {!isLoggedIn && (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <div className={styles.linkDiv} >
                                <Link to='/login' className={styles.links}>
                                    <Typography>
                                        Log in
                                    </Typography>
                                </Link>
                                <Link to='/signup' className={styles.links}>
                                    <Typography>
                                        Sign up
                                    </Typography>
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            )}
        </div>
    )
}

export default Home