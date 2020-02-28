import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'


const Login = () => {

    const { handleSubmit, register, errors}  = useForm()
    const [ serverError, setServerError ] = useState()
    const history = useHistory()

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography>
                    LOG IN
                </Typography>
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