import { JsonController, Get, Param, Body, Post, Delete, HttpCode } from 'routing-controllers'
import Answer  from './entity'
import { getConnection } from "typeorm"

@JsonController()
export default class AnswerController {

  @Get('/answers/:id')
  getAnswer(
    @Param('id') id: number
  ) {
    return Answer.findOneById(id)
  }

  @Get('/answers')
  async allAnswers() {
    const answers: Answer[] = await Answer.find()
    return { answers }
  }

  @Post('/answers')
  @HttpCode(201)
  async createAnswer(
    @Body() Answer: Answer
  ) {
    return Answer.save()
  }

  @Delete('/answers/:id')
  async deleteGame() {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Answer)
          .where("id = :id", { id: 1 })
          .execute()
  }
}