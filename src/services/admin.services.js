import * as authService from './auth.services'

async function getAllUsers() {
    return fetch('https://siayudo.herokuapp.com/api/admin/users', {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function verificarUser(id, status, motivo) {
    return fetch(`https://siayudo.herokuapp.com/api/admin/users/verificacion`, {
        method: 'PATCH',
        headers: {
            'auth-token': authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, status, motivo})
    })
    .then(response => response.json())
}

async function updateUser(user) {
    return fetch(`https://siayudo.herokuapp.com/api/admin/users`, {
        method: 'PUT',
        headers: {
            'auth-token': authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function getCategoriasFromPosts() {
    return fetch('https://siayudo.herokuapp.com/api/admin/categorias', {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function findMotivo(id) {
    return fetch(`https://siayudo.herokuapp.com/api/admin/${id}/motivo`, {
        headers: {
            'auth-token': authService.getToken()
        },
    })
    .then(response => response.json())
}

async function getPostsByTypeUser() {
    return fetch('https://siayudo.herokuapp.com/api/admin/posts', {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function sendEmailReject(email) {
    return fetch('https://siayudo.herokuapp.com/api/admin/user/reject', {
        method: 'POST',
        headers: {
            'auth-token': authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(response => response.json())

}

async function sendEmailAccept(email) {
    return fetch('https://siayudo.herokuapp.com/api/admin/user/accept', {
        method: 'POST',
        headers: {
            'auth-token': authService.getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(response => response.json())
}



export {
    getAllUsers,
    verificarUser,
    updateUser,
    getCategoriasFromPosts,
    findMotivo,
    getPostsByTypeUser,
    sendEmailReject,
    sendEmailAccept
}