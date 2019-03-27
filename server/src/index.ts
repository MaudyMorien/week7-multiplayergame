import 'reflect-metadata'
import GameController from './games/controller'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import AnswerController from './answers/controller'
import PlayerController from './players/controller'
import QuestionController from './questions/controller'
import UserController from './users/controller'
import {Server} from 'http'
import * as IO from 'socket.io'
import setupDb from './db'
import * as Koa from 'koa'

const app = new Koa()
const server = new Server(app.callback())
export const io = IO(server)
const port = process.env.PORT || 4000

useKoaServer(app, {
  controllers: [
    GameController,
    PlayerController,
    AnswerController,
    QuestionController,
    UserController
  ]
})

io.on('connect', socket => {
  const name = socket.request.user.firstName
  console.log(`User ${name} just connected`)

  socket.on('disconnect', () => {
    console.log(`User ${name} just disconnected`)
  })
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))

  