import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import GameController from './games/controller'
import AnswerController from './answers/controller'
import PlayerController from './players/controller'
import QuestionController from './questions/controller'
import UserController from './users/controller'

import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    GameController,
    PlayerController,
    AnswerController,
    QuestionController,
    UserController
  ]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))