import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, TextField, Button } from '@material-ui/core'

const Cats = () => {
    const csrfToken = localStorage.getItem('csrfToken')
    const [cats, setCats] = useState()
    const [error, setError] = useState()
    const { handleSubmit, register, errors } = useForm()

    useEffect(() => {
        (async () => {
            try{
                const res = await fetch('http://localhost:3000/cats', {
                    mode: 'cors',
                    credentials: 'include',
                    headers:{
                        'csrf-token': csrfToken
                    }
                })
                const data = await res.json()

                if(res.ok){
                    setCats(data)
                }else{
                    setError(data.error.message)
                }
            }catch(e){
                setError(e)
            }
        })()
    }, [])

    if (error != null){
        return(
            <div>
                <h4>ERROR</h4>
                {error.message}
            </div>
        )
    }

    if (cats == null){
        return <div>Loading...</div>
    }

    const onSubmit = async values => {
        console.log("CATS VALUES >> ", values)
        setError(null)
        const res = await fetch('http://localhost:3000/cats/', {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values)
        })

        const responseData = await res.json()
        console.log(responseData)

        if (responseData.error != null){
            setError(responseData.error.message)
        }
    }

    return(
        <div>

            <Typography>
                Add your cat to the database
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
            
                <TextField
                    type='text'
                    name='name'
                    label='Your cats name'
                    error={errors.name != null}
                    fullWidth
                    inputRef={register({
                        required: 'Required'
                    })}
                />

                <Typography>
                    {errors.name && errors.name.message}
                </Typography>

                <TextField
                    type='text'
                    name='color'
                    label='Your cats color'
                    error={errors.color != null}
                    fullWidth
                    inputRef={register({
                        required: "Required"
                    })}
                />

                <Typography>
                    {errors.color && errors.color.message}
                </Typography>

                <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    fullWidth
                    >Submit    
                </Button>

                
                    {cats.map((cat) => (
                        <Typography key={cat.id}>
                            {cat.name }
                            is
                            { cat.color}
                        </Typography>
                    ))}
                



            </form>
        </div>
    )
}

export default Cats 
