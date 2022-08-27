import * as authService from './auth.services'

async function traerCategorias() {
    const response = await fetch('https://siayudo.herokuapp.com/api/categorias', {
        headers: {
            'auth-token': authService.getToken()
        },
    })
    return await response.json()
}

export {
    traerCategorias
}