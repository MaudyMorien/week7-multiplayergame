import { JsonController, Get, Param, Body, Post, Delete, HttpCode } from 'routing-controllers'
import Question  from './entity'
import { getConnection } from "typeorm"

@JsonController()
export default class QuestionController {

  @Get('/questions/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Question.findOne(id)
  }

  @Get('/questions')
  async allQuestions() {
    const questions: Question[] = await Question.find()
    return { questions }
  }

  @Post('/questions')
  @HttpCode(201)
  async createQuestion(
    @Body() Question: Question
  ) {
    return Question.save()
  }

  @Delete('/questions/:id')
  async deleteGame() {
      await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Question)
          .where("id = :id", { id: 1 })
          .execute()
  }
}