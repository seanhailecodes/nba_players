const baseUrl = 'http://nba-players-app.herokuapp.com'

export const loginUser = (loginData) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${baseUrl}/auth/login`, opts)
        .then(resp => resp.json())
        .catch(error => console.log(error))
}

export const registerUser = (registerData) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ user: registerData }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${baseUrl}/users/`, opts)
        .then(resp => resp.json())
        .then(resp=>console.log(resp))
        .catch(error => console.log(error))
}

const createPlayer = (data) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ player: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseUrl}/players`, opts)
        .then(resp => resp.json())
        .catch(error => console.log(error))
}

const readAllPlayers = () => {
    return fetch(`${baseUrl}/players`)
    .then(resp => resp.json()) 
    .catch(error => console.log(error))
    }

const updatePlayer = (id, data) => {
    const opts = {
        method: 'PUT',
        body: JSON.stringify({ player: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseUrl}/players/${id}`, opts)
    .then(resp => resp.json())
    .catch(error => console.log(error))
}

const destroyPlayer = (id) => {
    const opts = {
        method: 'DELETE'
    }
    return fetch(`${baseUrl}/players/${id}`, opts)
}
export {
    createPlayer,
    readAllPlayers,
    updatePlayer,
    destroyPlayer
}