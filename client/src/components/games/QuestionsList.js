// // Copy from GamesList

// import React, {PureComponent} from 'react'
// import {getGames, createGame } from '../../actions/games'
// import {getUsers} from '../../actions/users'
// import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
// import { Card, CardActions, CardContent } from '@material-ui/core'
// import Typography from '@material-ui/core/Typography'
// import './GamesList.css'
// import { Link } from 'react-router-dom';

// const qAs = [
//     {
//         question: 'Nice weather today?',
//         answer0: true,
//         answer1: false
//     },
//     {
//         question: 'Does a spider have more than 10 legs?',
//         answer0: true,
//         answer1: false
//     }
// ]

// class QuestionsList extends PureComponent {
//   componentDidMount() {
    
//     // if (this.props.authenticated) {
//     //   if (this.props.games === null) this.props.getGames()
//     //   if (this.props.users === null) this.props.getUsers()
//     // }
//   }


// render() {

//     const randomQuestionIndex = Math.floor(Math.random() * qAs.length)
//     const {games, users, authenticated, createGame} = this.props

//     // if (!authenticated) return (
// 		// 	<Redirect to="/login" />
//     // )
    
//     // if (games === null || users === null) return null

//     return (<Paper className="outer-paper">
//       <div>
//         {qAs[randomQuestionIndex].question}
//       </div>

//       <Button>Yes</Button>
//       <Button>No</Button>
//       {/* <Button onClick={some function, here the result and move to the next random question}> is needed! */}
//     </Paper>)
  
//       // {Landing}
//   }
// }

// const mapStateToProps = state => ({
//   // authenticated: state.currentUser !== null,
//   users: state.users === null ? null : state.users,
//   games: state.games === null ?
//     null : Object.values(state.games).sort((a, b) => b.id - a.id)
// })

// export default connect(mapStateToProps, {getGames, getUsers, createGame })(QuestionsList)
