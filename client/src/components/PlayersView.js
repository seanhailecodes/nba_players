import React from 'react';
import { withRouter } from 'react-router';
import './css/PlayersView.css'

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
          <h5>
            <p className="playerDetail">{player.position}</p>
          </h5>
          <h5>
            <p className="playerDetail">{player.height}</p>
          </h5>
          <h5 className="playerDetail">
            <p>{player.team}</p>
          </h5>
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