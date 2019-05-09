import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import PlayerPage from './components/PlayerPage'
import CreatePlayer from './components/CreatePlayer'
import Login from './components/Login'
import Register from './components/Register'
import PlayersView from './components/PlayersView'


import {
  createPlayer,
  readAllPlayers,
  loginUser,
  registerUser,
  updatePlayer,
  destroyPlayer
} from './services/api-helper'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      playerForm: {
        name: "",
        photo: "",
        // position: "",
        // height: "",
        // team: "" ~~~add to component~~~
      },      
        currentUser: null,
        authFormData: {
          username: "",
          email: "",
          password: ""
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.mountEditForm = this.mountEditForm.bind(this)
    this.editPlayer = this.editPlayer.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.newPlayer = this.newPlayer.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
  }

  componentDidMount() {
    this.getPlayers();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  async getPlayers() {
    const players = await readAllPlayers()
    this.setState({
      players
    })
  }

  async newPlayer(e){
    e.preventDefault();
    const player = await createPlayer(this.state.playerForm)
    this.setState(prevState => ({
      players: [...prevState.players, player],
      playerForm: {
        name: "",
        photo: ""
      }
    }))
  }

  async editPlayer(){
    const { playerForm } = this.state
    await updatePlayer(playerForm.id, playerForm);
    this.setState(prevState => (
      {
        players: prevState.players.map(player => player.id === playerForm.id ? playerForm : player),
      }
    ))
  }

async deletePlayer(id){
  await destroyPlayer(id);
  this.setState(prevState => ({
    players: prevState.players.filter(player => player.id !== id)
  }))
}

handleFormChange(e) {
  const { name, value } = e.target;
  this.setState(prevState => ({
    playerForm: {
      ...prevState.playerForm,
      [name]: value
    }
  }))
}

async mountEditForm(id) {
  const players = await readAllPlayers();
  const player = players.find(el => el.id === parseInt(id));
  this.setState({
    playerForm: player
  });
}


  // ~~~~~Authentication Handlers Below~~~~~~~

  handleLoginButton() {
    this.props.history.push("/login")
  }

  async handleLogin() {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
  }

  async handleRegister(e) {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
        <img src='' className="App-logo" alt="logo" />
          <h1 className="nbaLogo"><Link to='/' onClick={()=> this.setState({
            playerForm: {
              name: "",
              photo: ""
            }
          })}>
            NBA Players App</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login/register</button>
            }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
        exact path="/"
        render={() => (
          <PlayersView
          players={this.state.players}
          playerForm={this.state.playerForm}
          handleFormChange={this.handleFormChange}
          newPlayer={this.newPlayer} />
        )}
        />
        <Route 
        path="/new/player"
        render={() => (
          <CreatePlayer
            handleFormChange={this.handleFormChange}
            playerForm={this.state.playerForm}
            newPlayer={this.newPlayer} />
        )} />
        <Route
        path="/players/:id"
        render={(props) => {
          const { id } = props.match.params;
          const player = this.state.players.find(el => el.id === parseInt(id));
          return <PlayerPage
            id = { id }
            player = { player }
            handleFormChange = { this.handleFormChange }
            mountEditForm = { this.mountEditForm }
            editPlayer = { this.editPlayer }
            playerForm = { this.state.playerForm }
            currentUser = { this.state.currentUser }
            deletePlayer = { this.deletePlayer } />
        }}
        />
      </div>
    )
  }
}

export default withRouter(App);
