import {
  JsonController, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch, Authorized
} from 'routing-controllers'
import Answer from '../answers/entity'
import User from '../users/entity'
import Game from './entity'
import Player from '../players/entity'
import Question from '../questions/entity'
// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
// import { Validate } from 'class-validator'
import { io } from '../index'


@JsonController()
export default class GameController {

@Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    const player = await Player.create({
      game: entity,
      user
    })
    await player.save()

    const game = await Game.findOneById(entity.id)

    if (game) {
      const question_id = Math.ceil(Math.random() * 5)
      const question = await Question.findOneById(question_id)
      if (question) {
        game.question = question
        game.save()
      }
    }

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    await game.save()

    const player = await Player.create({
      game,
      user
    })
    await player.save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }


  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update // { status: 'started' }
  ) {
    console.log('update test:', update)
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })
    if (!player) throw new ForbiddenError(`You are not part of this game`)


    if (game.status === 'pending') {
      game.status = 'started'
      await game.save()
    } else {
      // Is this their first answer?
      await Answer
        .create({
          game,
          player,
          question: game.question,
          answer: update.answer
        })
        .save()

      const answers = await Answer.find({ game })
      const players = await Player.find({ game })

      if (answers.length === players.length) {
        console.log('all answers are submitted')

        // function filterAnswers(answers) {
        //   if(id in answers)
        // }
        // const countA = {}
        // answers.forEach(function (val) { val['answerA'] = (val['answerA'] || 0) + 1 })
        // console.log('count von Count A', countA)
        // const countB = {}
        // answers.forEach(function () { countB['answerB'] = (countB['AnswerB'] || 0) + 1 })
        // console.log('count von Count B', countB)
        // if (countA.length > countB.length) {
        //   return 'answer A has the most votes'
        // } else if (countA.length < countB.length) {
        //   return 'answer B has the most votes'
        // } else {
        //   return 'the votes are equal'
        // }

      } else if (answers.length < players.length) {
        console.log('still waiting for more answers')
      } else {
        // What should we do if this happens?
        console.log('too many answers!')
      }
    }
    const newGame = await Game.findOneById(gameId)
    console.log('payload', newGame)
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: newGame
    })

    return newGame
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  async getGames() {
    const games: Game[] = await Game.find()
    return { games }
  }
}
