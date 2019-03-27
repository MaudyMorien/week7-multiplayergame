// Copy from GamesList

import React, {PureComponent} from 'react'
import {getGames, createGame, apiTest} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Card, CardActions, CardContent } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import './GamesList.css'
import { Link } from 'react-router-dom';
import Landing from './landingPage';

const qAs = [
    {
        question: 'Nice weather today?',
        answer0: true,
        answer1: false
    },
    {
        question: 'Does a spider have more than 10 legs?',
        answer0: true,
        answer1: false
    }
]

class QuestionsList extends PureComponent {
  componentDidMount() {
    this.props.apiTest()
    
    // if (this.props.authenticated) {
    //   if (this.props.games === null) this.props.getGames()
    //   if (this.props.users === null) this.props.getUsers()
    // }
  }

//   renderGame = (game) => {
//     console.log(this.props, 'props')
//     const {users, history} = this.props

//     return (
//       <Card key={game.id} className="game-card">
//         <CardContent>
//           <Typography color="textSecondary">
//             This game is played by&nbsp;
//             {
//               game.players
//                 .map(player => users[player.userId].firstName)
//                 .join(' and ')
//             }
//           </Typography>
//           <Typography variant="headline" component="h2">
//             Game #{game.id}
//           </Typography>
//           <Typography color="textSecondary">
//             Status: {game.status}
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button
//             size="small"
//             onClick={() => history.push(`/games/${game.id}`)}
//           >
//             Watch
//           </Button>
//         </CardActions>
//       </Card>
//     )
//   }

//   renderQuestion = (question) => {
//     console.log(this.props, 'props')
//     const {users, history} = this.props

//     const randomQuestionIndex = Math.floor(Math.random() * qAs.length)
//     console.log(randomQuestionIndex, 'randomQuestionIndex')

//     return (<div>
//         {question[randomQuestionIndex]}
//     </div>
        
//     )
//   }

//   render() {
//     console.log('props', this.props)
//     const {games, users, authenticated, createGame} = this.props

//     if (!authenticated) return (
// 			<Redirect to="/login" />
// 		)

//     if (games === null || users === null) return null

//     return (<Paper className="outer-paper">
//       <Button
//         color="primary"
//         variant="contained"
//         onClick={createGame}
//         className="create-game"
//       >
//         Create Game
//       </Button>

//       <div>
//         {games.map(game => this.renderGame(game))}
//       </div>
//     </Paper>)
//   }

render() {

    const randomQuestionIndex = Math.floor(Math.random() * qAs.length)
    console.log(randomQuestionIndex, 'randomQuestionIndex')

    console.log('props', this.props)
    const {games, users, authenticated, createGame} = this.props

    // if (!authenticated) return (
		// 	<Redirect to="/login" />
    // )
    
    // if (games === null || users === null) return null

    return (<Paper className="outer-paper">
      <div>
        {qAs[randomQuestionIndex].question}
      </div>

      <Button>Yes</Button>
      <Button>No</Button>
      {/* <Button onClick={some function, here the result and move to the next random question}> is needed! */}
    </Paper>)
  
      // {Landing}
  }
}

const mapStateToProps = state => ({
  // authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, apiTest})(QuestionsList)