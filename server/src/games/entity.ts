import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'
import User from '../users/entity'

@Entity()
    export default class Game extends BaseEntity {
        @PrimaryGeneratedColumn()
        id?: number

        @IsString()
        @Column('text')
        name: string
       
        @OneToMany(() => User, user => user.id)
        public relations: User

    }