import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Game from '../games/entity'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

@Entity()

export default class Question extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  question: string
  
  @ManyToOne(() => Game, game => game.id)
  // @Column('text')
  game: Game

  @IsString()
  @Column('text')
  answerA: string
  
  @IsString()
  @Column('text')
  answerB: string
}
