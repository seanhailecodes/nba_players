const baseUrl = 'https://nbaplayers-production.up.railway.app'

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
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
    })
    .catch(error => {
        console.log('API Error:', error);
        // Return mock NBA players data when API fails
        return [
            { id: 1, name: "LeBron James", team: "Lakers", position: "Forward" },
            { id: 2, name: "Stephen Curry", team: "Warriors", position: "Guard" },
            { id: 3, name: "Kevin Durant", team: "Suns", position: "Forward" }
        ];
    })
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