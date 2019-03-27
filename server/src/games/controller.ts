import { JsonController, Get, Param, Body, Post, Delete, HttpCode } from 'routing-controllers'
import Game from './entity'
import { getConnection } from "typeorm"

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getPage(
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
    async createPlayer(
        @Body() Game: Game
    ) {
        return Game.save()
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