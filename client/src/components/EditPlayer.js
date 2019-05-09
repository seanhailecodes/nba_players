import React from 'react';
import { withRouter } from 'react-router-dom';
import './EditPlayer.css'

function EditPlayer(props) {
  return (
    <div>
      <h3 classname="nba" >Create a new player</h3>
      <form onSubmit={props.handleSubmit}>
        <p>Photo Link:</p>
        <input
          type="text"
          name="photo"
          value={props.playerForm.photo}
          onChange={props.handleFormChange} />
        <p>Player's name:</p>

        <input
          type="text"
          name="name"
          value={props.playerForm.name}
          onChange={props.handleFormChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(EditPlayer);