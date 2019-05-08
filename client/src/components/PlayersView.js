import React from 'react';
import { withRouter } from 'react-router';

function PlayersView(props) {
  return (
    <div className="player-container">
      {props.players.map(player => (
        <div
          key={player.id}
          className="player-card"
          onClick={(e) => {
            debugger;
            props.history.push(`/players/${player.id}`);
            window.scrollTo(0, 0);
          }}>
          <img alt={player.name} src={player.photo} />
          <h3>
            <p>{player.name}</p>
          </h3>
        </div>
      ))}
      <div
        className="player-card"
        onClick={() => {
          props.history.push('/new/player');
          window.scrollTo(0, 0);
        }}>
        <img
          alt="Create a new player"
          src="https://i.imgur.com/4SWyffC.jpg"
          className="plus-sign" />
        <h3>Create a player</h3>
      </div>
    </div>
  )
}

export default withRouter(PlayersView)