import { JsonController, Get, Param, Body, Post, Delete, HttpCode } from 'routing-controllers'
import Player  from './entity'
import { getConnection } from "typeorm"

@JsonController()
export default class PlayerController {

  @Get('/players/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Player.findOne(id)
  }

  @Get('/players')
  async allPlayers() {
    const players: Player[] = await Player.find()
    return { players }
  }

  @Post('/players')
  @HttpCode(201)
  async createPlayer(
    @Body() Player: Player
  ) {
    return Player.save()
  }

  @Delete('/players/:id')
  async deleteGame() {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Player)
          .where("id = :id", { id: 1 })
          .execute()
  }
}