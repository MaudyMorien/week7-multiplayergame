import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import  Game from './entity'
import Player from '../players/entity'
// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
// import { Validate } from 'class-validator'
import {io} from '../index'

@JsonController()
export default class GameController {

  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    console.log('\nCREATE GAME')
    const entity = await Game.create().save()
    console.log('entity test:', entity)

    const player = await Player.create({
      game: entity, 
      user
    })

    console.log('player test:', player)
    
    await player.save()

    console.log('after test:', player)

    const game = await Game.findOneById(entity.id)

    console.log('game test:', game) 

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

  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Post('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update // { status: 'started' }
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)

    const isPlayerTheHost = true

    const isStatusPending = game.status === 'pending'

    const isAllowedToChange = isStatusPending ? isPlayerTheHost : true
    
    if (isAllowedToChange) {
      const updateKeys = Object.keys(update) // ['status']

      updateKeys
        .map(updateKey => // 'status'
          {
            game[updateKey] = update[updateKey]
          }
        )

      await game.save()
    } else {
      throw new BadRequestError(`It's not your turn`)
    }
    
    // if (player.symbol !== game.turn) 
    // if (!isValidTransition(player.symbol, game.board, update.board)) {
    //   throw new BadRequestError(`Invalid move`)
    // }    
    
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Post('/games/:id([0-9]+)/start')
  async startGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    // if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
    // if (!isValidTransition(player.symbol, game.board, update.board)) {
    //   throw new BadRequestError(`Invalid move`)
    // }    

    // const winner = calculateWinner(update.board)
    // if (winner) {
    //   game.winner = winner
    //   game.status = 'finished'
    // }
    // else if (finished(update.board)) {
    //   game.status = 'finished'
    // }
    // else {
    //   game.turn = player.symbol === 'x' ? 'o' : 'x'
    // }
    // game.board = update.board
    // await game.save()
    
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Get('/games')
  async getGames() {
    const games: Game[] = await Game.find()
    return { games }
  }

  @Get('/test')
  sayHello() {
    return { hi: 'from server' }
  }

  @Get('/')
  iExists() {
    return { hi: 'from server' }
  }
}

