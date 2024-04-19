import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import {PrismaService} from "../prisma.service"

@Module({
  providers: [PrismaService, UserResolver, UserService],
})
export class UserModule {}
