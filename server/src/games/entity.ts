import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne} from 'typeorm'
// import User from '../users/entity'
import Player from '../players/entity';
import { IsString } from 'class-validator';

export type Symbol = 'x' | 'o'
export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
    export default class Game extends BaseEntity {
        @PrimaryGeneratedColumn()
        id?: number

        @IsString()
        @Column('text')
        name: string
       
        @Column('text', {default: 'pending'})
        status: Status
        
        @OneToMany(_ => Player, player => player.game, {eager:true})
        players: Player[]
  }