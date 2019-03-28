import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Player from '../players/entity'
import Question from '../questions/entity'
import { IsNumber } from 'class-validator'
import Game from '../games/entity'

@Entity()
export default class Answer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNumber()
  @Column('text')
  answer: number
    
  @ManyToOne(() => Game, game => game.id)
  // @Column('text')
  game: Game

  @ManyToOne(() => Player, player => player.id)
  // @Column('text')
  player: Player

  @ManyToOne(() => Question, question => question.id)
  // @Column('text')
  question: Question

}
