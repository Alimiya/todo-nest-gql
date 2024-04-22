import {Field, ObjectType} from "@nestjs/graphql"
import {User} from "../../user/entities/user.entity"
import {IsString} from "class-validator"

@ObjectType()
export class LoginResponse {
    @Field()
    @IsString()
    access_token: string

    @Field(()=> User)
    @IsString()
    user: User
}