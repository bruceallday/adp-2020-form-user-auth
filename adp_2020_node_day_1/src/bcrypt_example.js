import bcrypt from 'bcrypt'

const resgisterNewUser = async () => {
    const password = 'hunter2'
    const saltRounds = 10

    const hash = await bcrypt.hash(password, saltRounds)
        
    console.log('HASHED', hash)
}

resgisterNewUser()