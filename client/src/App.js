import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import GamesList from './components/games/GamesList'
import GameDetails from './components/games/GameDetails'
import QuestionsList from './components/games/QuestionsList'
import LogoutPage from './components/logout/LogoutPage'
import './App.css'
import TopBar from './components/layout/TopBar'
import Landing from './components/games/landingPage';

// <Route exact path="/signup" component={SignupPage} />
// <Route exact path="/games" component={GamesList} />
// <Route exact path="/games/:id" component={GameDetails} />

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/games" component={QuestionsList} />
            <Route exact path="/" component={Landing} />
            {/* <Route exact path="/games" component={QuestionsList} /> */}
            {/* <Route exact path="/games/:id" component={GameDetails} /> */}
            {/* <Route exact path="/" render={ () => <Redirect to="/games" /> } /> */}
          </main>
        </div>
      </Router>
    )
  }
}
export default App