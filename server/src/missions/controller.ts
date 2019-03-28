import { JsonController, Get, Param, Body, Post, HttpCode } from 'routing-controllers'
import Mission  from './entity'

@JsonController()
export default class MissionController {

  @Get('/missions/:id')
  getMission(
    @Param('id') id: number
  ) {
    return Mission.findOneById(id)
  }

  @Get('/missions')
  async allMissions() {
    const missions: Mission[] = await Mission.find()
    return { missions }
  }

  @Post('/missions')
  @HttpCode(201)
  async createMission(
    @Body() Mission: Mission
  ) {
    return Mission.save()
  }

}