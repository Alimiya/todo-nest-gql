import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import {PrismaService} from "../prisma.service";
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "../auth/strategies/jwt.strategy";

@Module({
  providers: [PrismaService, TaskResolver, TaskService, JwtStrategy],
})
export class TaskModule {}
