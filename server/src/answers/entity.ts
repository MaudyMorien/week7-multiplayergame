import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Player from '../players/entity'
import Question from '../questions/entity'
import Game from '../games/entity'

// Maybe an index here?
@Entity()
@Index(['player', 'question'], {unique:true})
export default class Answer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text') 
  answer: string
    
  @ManyToOne(() => Game, game => game.answers)
  // @Column('text')
  game: Game

  @ManyToOne(() => Player, player => player.id)
  // @Column('text')
  player: Player


  @ManyToOne(() => Question, question => question.id)
  // @Column('text')
  question: Question

}
