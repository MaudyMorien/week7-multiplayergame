import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

@Entity()

export default class Question extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  question: string

  @IsString()
  @Column('text')
  answerA: string
  
  @IsString()
  @Column('text')
  answerB: string
}
