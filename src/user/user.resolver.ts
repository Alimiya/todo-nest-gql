import {Resolver, Query, Args, Int, Mutation} from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import {CreateUserInput} from "./dto/create-user.input"
import {UseGuards} from "@nestjs/common"
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {name: 'createUser'})
  @UseGuards(JwtAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => [User], { name: 'findUsers' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'findUser' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }
}
