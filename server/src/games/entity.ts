import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import Player from '../players/entity'

type Status = 'pending' | 'started' | 'finished'

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