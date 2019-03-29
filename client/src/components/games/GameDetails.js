import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, joinGame, updateGame, startGame } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'
import Paper from '@material-ui/core/Paper'
import Board from './Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  startGame = () => {
    const { game, updateGame } = this.props

    updateGame(game.id, { status: 'started' })
  }

  submitAnswer = answer => {
    const { game, updateGame } = this.props

    updateGame(game.id, { answer })
  }


  render() {
    const { game, users, authenticated, userId } = this.props

    if (!authenticated) return (
      <Redirect to="/login" />
    )
    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId)
    const playersWaiting = Object
      .values(game.players)
      .map(user => <div key={user.user.email}>
        {user.user.email}
      </div>)

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]


    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>
      <h3>Players: {playersWaiting}</h3>
      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&

        game
          .players
          .map(p => p.user.id)
          .indexOf(userId) === 0 &&
        <button onClick={this.startGame}>Start Game</button>
      }

      {
        game.status === 'pending' &&

        game
          .players
          .map(p => p.user.id)
          .indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        game.status === 'started' &&
        <div>
          {game.question.question}
          <br />
          <button onClick={() => this.submitAnswer('answerA')}> {game.question.answerA} </button>
          <button onClick={() => this.submitAnswer('answerB')}> {game.question.answerB} </button>
        </div>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.board &&
        game.status !== 'pending' &&
        <Board board={game.board} makeMove={this.makeMove} />
      }

      { game.result && <div>{game.result}</div>}
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, startGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
