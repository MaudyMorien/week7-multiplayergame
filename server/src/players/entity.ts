import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Game from '../games/entity'
import { IsNumber } from 'class-validator'

@Entity()
export default class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @OneToMany(() => User, user => user.id)
  @Column('text')
  User: number
  
  @OneToMany(() => Game, game => game.id)
  @Column('text')
  game: number

  @IsNumber()
  @Column('text')
  score: number
}
