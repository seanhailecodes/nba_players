import React, { Component } from 'react';
import EditPlayer from './EditPlayer'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { player } = this.props;
    return (
      <div className="player-page">
        {player === undefined ? <h2>No player found . . .</h2> : (
          <div>
            <img alt={player.name} src={player.photo} />
            {this.state.isEdit ?
              <Route path={'/players/:id/edit'} render={() => (
                <EditPlayer
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editPlayer();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/players/${this.props.playerForm.id}`)
                  }}
                  playerForm={this.props.playerForm} />
              )} />
              :
              <>
                <h1>{player.name}</h1>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/players/${player.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deletePlayer(player.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(PlayerPage);