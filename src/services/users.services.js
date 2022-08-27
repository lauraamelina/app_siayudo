import * as authService from './auth.services'

async function findUserById(id) {
    return fetch(`https://siayudo.herokuapp.com/api/users/${id}`, {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function updateUser(user) {
    return fetch(`https://siayudo.herokuapp.com/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
            'auth-token': authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function updateImage(data) {
    return fetch(`https://siayudo.herokuapp.com/api/users/image`, {
        method: 'POST',
        headers: {
            'auth-token': authService.getToken(),
        },
        body: data
    })
    .then(response => response.json())
}

async function findUserByEmail(email) {
    return fetch(`https://siayudo.herokuapp.com/api/users/email`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    .then(response => response.json())
}



export {
    findUserById,
    updateUser,
    updateImage,
    findUserByEmail
}