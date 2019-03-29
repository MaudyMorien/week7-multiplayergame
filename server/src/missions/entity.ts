import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Player from '../players/entity'

@Entity()
export default class Mission extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  mission: string
  
  @ManyToOne(() => Player, player => player.id)
  Player: Player

}