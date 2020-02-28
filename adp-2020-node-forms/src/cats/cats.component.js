import React, { useEffect, useState } from 'react'

const Cats = () => {
    const csrfToken = localStorage.getItem('csrfToken')
    const [cats, setCats] = useState()
    const [error, setError] = useState()

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

    return(
        <div>
            {cats.map((cat) => (
                <div key={cat.id}>
                {cat.name}
                is
                {cat.color}
                </div>
            ))}
        </div>
    )
}

export default Cats 
