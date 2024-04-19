import {Injectable, Param} from '@nestjs/common'
import {CreateUserInput} from "./dto/create-user.input"
import {PrismaService} from "../prisma.service"

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({data: createUserInput})
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(@Param('username') username: string) {
    return this.prisma.user.findUnique({where: {username: username}})
  }
}
