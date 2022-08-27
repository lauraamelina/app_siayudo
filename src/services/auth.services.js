
async function login(email, password) {
    return fetch('https://siayudo.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    .then(async res => {
        if(res.status === 200) {
            return res.json()
        } 
            throw new Error('Error de autenticación: el correo o la contraseña son incorrectos')
        
    })
}

async function registro(user) {
    return fetch('https://siayudo.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if(res.status === 201) {
            res.json()
        } else {
            throw new Error('Error de autenticación: la cuenta ya existe')
        }
    })
}

async function forgotPassword(email) {
    return fetch('https://siayudo.herokuapp.com/api/users/forgotpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    .then(async res => {
        if(res.status === 200) {
            return res.json()
        } 
            throw new Error('El email no existe en nuestros registros')
        
    })
}

async function resetPassword(id, token, password) {
    return fetch('https://siayudo.herokuapp.com/api/users/resetpassword', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, token, password})
    })
    .then(async res => {
        if(res.status === 200) {
            return res.json()
        } 
            throw new Error('El token no existe o está expirado')
        
    })
}

async function updateFile(data) {
    return fetch('https://siayudo.herokuapp.com/api/users/file', {
        method: 'POST',
        headers: {
            'auth-token': localStorage.getItem('token')
        },
        body: data
    })
    .then(res => res.json())
}

function isAuth() {
    if (getToken() && getUser()) {
        return true
    } 
}

function logout() {
    deleteUser()
    deleteToken()
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function getToken() {
    return localStorage.getItem('token')
}

function setToken(token) {
    localStorage.setItem('token',token)
}

function deleteUser() {
    localStorage.removeItem('user')
}

function deleteToken() {
    localStorage.removeItem('token')
}




export {
    login,
    registro,
    getUser,
    setUser,
    getToken,
    setToken,
    deleteUser,
    deleteToken,
    logout,
    isAuth,
    forgotPassword,
    resetPassword,
    updateFile
}