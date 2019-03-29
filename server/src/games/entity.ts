import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import Answer from '../answers/entity';
import Player from '../players/entity';
import Question from '../questions/entity';
import { IsString } from 'class-validator';


export type Row = [Symbol | null, Symbol | null, Symbol | null]
export type Board = [Row, Row, Row]

type Status = 'pending' | 'started' | 'finished'

// const emptyRow: Row = [null, null, null]
// const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()

export default class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', { default: 'blahblah' })
    name: string

    @Column('text', { default: 'pending' })
    status: Status

    @OneToMany(_ => Player, player => player.game, { eager: true })
    players: Player[]

    @OneToOne(_ => Question, { eager: true })
    @JoinColumn()
    question: Question 

    @OneToMany(_ => Answer, answer => answer.game, { eager: true })
    answers: Answer[]
}
