import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, AppBar, Toolbar, TextField, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from 'react-hook-form'
import { useStyles } from './login-styles'


const Login = () => {

    const { handleSubmit, register, errors}  = useForm()
    const [ serverError, setServerError ] = useState()
    const history = useHistory()
    const styles = useStyles()

    const onSubmit = async values => {
        setServerError(null)
        const res = await fetch('http://localhost:3000/login', {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(values)
        })

        const responseData = await res.json()

        console.log(responseData)

        if (responseData.error != null){
            setServerError(responseData.error.message)
        }else{
            localStorage.setItem('csrfToken', responseData.csrfToken)
            history.push('/')
        }
    }
   
    return(
        <div style={{
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <AppBar>
                    <Toolbar>
                        <Typography>
                            Peaae log in below
                        </Typography>
                    </Toolbar>
                </AppBar>

                <TextField
                    type ="text"
                    name="name"
                    label="User Name" 
                    error={errors.name != null}
                    fullWidth
                    inputRef={register({
                        required: 'Required'
                    })}
                />

                <Typography color="error">
                    {errors.name && errors.name.message}
                </Typography>

                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    error={errors.password != null}
                    fullWidth
                    inputRef={register({
                        required: 'Required'
                    })}
                />

                <Typography>
                    {errors.password && errors.password.message}
                </Typography>

                <Typography color="error">
                    {serverError}
                </Typography>

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    >LOG IN
                </Button>
            </form>
        </div>
    )
}

export default Login