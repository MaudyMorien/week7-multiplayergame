import { JsonController, Get, Param, CurrentUser, Post, Delete, HttpCode, BadRequestError } from 'routing-controllers'
import {io} from '../index'
import Game from './entity'
import User from '../users/entity'
import Player from '../players/entity'
import { getConnection } from "typeorm"

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }

    @Get('/games')
    async allGames() {
        const game: Game[] = await Game.find()
        return { game }
    }

    @Post('/games')
    @HttpCode(201)
    async createGame(
      @CurrentUser() user: User
    ) {
      const entity = await Game.create().save()
  
      await Player.create({
        game: entity, 
        user
      }).save()
  
      const game = await Game.findOne(entity.id)
  
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
      const game = await Game.findOne(gameId)
      if (!game) throw new BadRequestError(`Game does not exist`)
      if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)
  
      game.status = 'started'
      await game.save()
  
      const player = await Player.create({
        game, 
        user
      }).save()
  
      io.emit('action', {
        type: 'UPDATE_GAME',
        payload: await Game.findOne(game.id)
      })
  
      return player
    }

    @Delete('/games/:id')
    async deleteGame() {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Game)
            .where("id = :id", { id: 1 })
            .execute()
    }
}
