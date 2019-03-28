import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Player from '../players/entity';
import { IsString } from 'class-validator';


export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

@Entity()
    export default class Game extends BaseEntity {
        @PrimaryGeneratedColumn()
        id?: number

        @IsString()
        @Column('text', {default: 'blahblah'})
        name: string
       
        @Column('text', {default: 'pending'})
        status: Status
        
        @OneToMany(_ => Player, player => player.game, {eager:true})
        players: Player[]
  }