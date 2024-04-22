import {Injectable, NotFoundException, Param} from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import {PrismaService} from "../prisma.service";

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  createTask(createTaskInput: CreateTaskInput) {
    return this.prisma.task.create({data: createTaskInput})
  }

  async toggleDone(@Param('id') id:string) {
    const task = await this.getTaskById(id)

    return this.prisma.task.update({
      where: {
        id:task.id,
      },
      data: {
        isDone: !task.isDone
      }
    })
  }

  async deleteTask(@Param('id') id:string) {
    const task = await this.getTaskById(id)

    return this.prisma.task.delete({
      where: {
        id:task.id,
      }
    })
  }

  async updateTask(@Param('id') id:string, updateTaskInput: UpdateTaskInput) {
    const task = await this.getTaskById(id)

    return this.prisma.task.update({
      where: {
        id:task.id,
      },
      data: updateTaskInput
    })
  }

  async getTaskById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: id,
      }
    })

    if(!task) throw new NotFoundException(`Task ${id} not found`)

    return task
  }

  getAllTasks() {
    return this.prisma.task.findMany()
  }
}
