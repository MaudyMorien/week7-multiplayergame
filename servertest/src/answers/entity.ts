import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import User from '../users/entity'
import Question from '../questions/entity'
import { IsBoolean } from 'class-validator'

@Entity()
export default class Answer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsBoolean()
  @Column('text')
  answer: boolean
  
  @ManyToOne(() => User, user => user.id)
  @Column('text')
  user: number

  @ManyToOne(() => Question, question => question.id)
  @Column('text')
  question: number

}
