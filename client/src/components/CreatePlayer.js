import React from 'react';
import { withRouter } from 'react-router-dom';

function CreatePlayer(props) {
  return (
    <div className="create-form" >
      <h2>Create a Player</h2>
      <form onSubmit={props.newPlayer}>
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
    </div >
  )
}

export default withRouter(CreatePlayer);