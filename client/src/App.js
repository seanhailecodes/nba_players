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
  loginUser,
  registerUser,
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

    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
  }

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
          <h1>NBA Players App</h1>
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
            deletePlayer = { this.deletePlayer } />
        }}
        />
      </div>
    )
  }
}

export default withRouter(App);
