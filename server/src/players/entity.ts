import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Game from '../games/entity'
import { IsNumber } from 'class-validator'

export type Symbol = 'x' | 'o'

@Entity()
@Index(['game', 'user'], {unique:true})
export default class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => User, user => user.players)
  // @Column('text')
  user: User
  
  @ManyToOne(() => Game, game => game.players)
  // @Column('text')
  game: Game

  @IsNumber()
  @Column('text', {default: 0})
  score: number
}
