import * as authService from './auth.services'

async function find() {
    return fetch('https://siayudo.herokuapp.com/api/posts', {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}


async function findById(id) {
    return fetch(`https://siayudo.herokuapp.com/api/posts/${id}`, {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}   

async function findByUser(id) {
    return fetch(`https://siayudo.herokuapp.com/api/user/${id}/posts`, {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}   

async function create(project) {
   return fetch('https://siayudo.herokuapp.com/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
        body: JSON.stringify(project)
    }).then(response => response.json())
}

async function filterCategoria(id) {
    return fetch(`https://siayudo.herokuapp.com/api/posts/categoria/${id}`, {
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function deletePost(id) {
    return fetch(`https://siayudo.herokuapp.com/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'auth-token': authService.getToken()
        }
    })
    .then(response => response.json())
}

async function update(id, post) {
    return fetch(`https://siayudo.herokuapp.com/api/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
        body: JSON.stringify(post)
    }).then(response => response.json())
}

async function updatePostByUser(id) {
    return fetch(`https://siayudo.herokuapp.com/api/user/${id}/posts`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
    }).then(response => response.json())
}

async function uploadImage(data) {
    return fetch(`https://siayudo.herokuapp.com/api/posts/upload`, {
        method: 'POST',
        headers: {
            'auth-token': authService.getToken()
        },

        body: data
        
    }).then(response => response.json())
}



export  {
    find,
    findById,
    findByUser,
    create,
    filterCategoria,
    deletePost,
    update,
    updatePostByUser,
    uploadImage
}



