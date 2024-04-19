import { Injectable } from '@nestjs/common'
import {UserService} from "../user/user.service"
import {LoginUserInput} from "./dto/login-input"
import {User} from "../user/entities/user.entity"
import {JwtService} from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise <any> {
        const user = await this.userService.findOne(username)

        const valid = await bcrypt.compare(password, user.password)

        if(user && valid) {
            const {password, ...result} = user
            return result
        }

        return null
    }

    async login(user:User) {

        return {
            access_token: this.jwtService.sign({username: user.username, sub: user.id}),
            user
        }
    }

    async register(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username)
        if(user) {
            throw new Error('User already exists')
        }
        const password = await bcrypt.hash(loginUserInput.password, 10)
        return this.userService.create({...loginUserInput, password})
    }
}
