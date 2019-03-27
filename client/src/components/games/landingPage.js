import * as React from 'react'
import {Link} from "react-router-dom"

export default class Landing extends React.Component {
    render() {
        return (
            <div className='landing'>
                <h2>Game rules</h2>
                <ol>
                    <li>There is no right or wrong answer. Just pick up the most appropriate one</li>
                    <li>"Correct" answer will be revealed at the end of each question. You get 1 point for correct one, otherwise 0</li>
                    <li>The game ends when one player get 5 points. To make the game even more fun, there is no scoreboard at all</li>
                </ol>
                <Link to={'/games'}><button>Why not dive in right now?</button></Link>
            </div>
        )
    }

}