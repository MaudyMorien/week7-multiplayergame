import { JsonController, Get, Param, Body, Post, Delete, HttpCode } from 'routing-controllers'
import User  from './entity'
import { getConnection } from "typeorm"

@JsonController()
export default class UserController {

  @Get('/users/:id')
  getPage(
    @Param('id') id: number
  ) {
    return User.findOne(id)
  }

  @Get('/users')
  async allUsers() {
    const users: User[] = await User.find()
    return { users }
  }

  @Post('/users')
  @HttpCode(201)
  async createUser(
    @Body() User: User
  ) {
    return User.save()
  }

  @Delete('/users/:id')
  async deleteGame() {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id: 1 })
          .execute()
  }
}