import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'


const Signup = () => {

    const { handleSubmit, register, errors } = useForm()
    const [serverError, setServerError] = useState()

    const onSubmit = async values => {
        console.log(values)

        if (values.password !== values.confirmpassword){
            setServerError('Passwords do not match')
            return
        }

        console.log("SENT DATA")

        setServerError(null)
        const res = await fetch('http://localhost:3000/signup', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(values)
        })

        const responseData = await res.json()
        console.log(responseData)

        if (responseData.error != null) {
            setServerError(responseData.error.message)
        }
    }

    return (
        <div style={{
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Typography>
                    SIGN UP
                </Typography>

                <TextField
                    type="text"
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
                <Typography color="error">
                    {errors.password && errors.password.message}
                </Typography>


                <TextField
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    error={errors.password != null}
                    fullWidth
                    inputRef={register({
                        required: 'Required'
                    })}
                />
                <Typography color="error">
                    {errors.password && errors.password.message}
                </Typography>

                <Typography color="error">
                    {serverError}
                </Typography>

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth>SIGN UP
                </Button>
            </form>
        </div>
    )
}

export default Signup