import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
@ObjectType()
export class User {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column()
    @IsEmail()
    email: string

    @Field()
    @Column()
    @MaxLength(16)
    @MinLength(8)
    password: string

    @Field()
    @Column()
    role: string

}