import * as authService from './auth.services'


async function addMessage(message, userFrom, userTo) {
  return fetch ('https://siayudo.herokuapp.com/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': authService.getToken()
    },
    body: JSON.stringify({message, userFrom, userTo})
    }).then(response => response.json())

}

async function getMessages(userFrom, userTo) {
    return fetch ('https://siayudo.herokuapp.com/api/chat/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
        body: JSON.stringify({userFrom, userTo})
        }).then(response => response.json())
}

async function sendEmail(userFrom, userTo) {
    return fetch ('https://siayudo.herokuapp.com/api/chat/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
        body: JSON.stringify({userFrom, userTo})
        }).then(
            console.log('email sent')
        )
}

async function getInbox(id) {
    return fetch ('https://siayudo.herokuapp.com/api/chat/inbox', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authService.getToken()
        },
        body: JSON.stringify({id})
        }).then(response => response.json())
}


export {
    addMessage,
    getMessages,
    sendEmail,
    getInbox
}