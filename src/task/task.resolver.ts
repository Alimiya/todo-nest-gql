import {Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task, {name: 'createTask'})
  @UseGuards(JwtAuthGuard)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput, @Context() context) {
    createTaskInput.userId = context.req.user.userId
    return this.taskService.createTask(createTaskInput);
  }

  @Query(() => [Task], { name: 'findTasks' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.taskService.getAllTasks();
  }

  @Query(() => Task, { name: 'findTask' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.taskService.getTaskById(id);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  @UseGuards(JwtAuthGuard)
  updateTask(@Args('id') id:string, @Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.updateTask(id, updateTaskInput);
  }

  @Mutation(()=> Task, { name: 'toggleDone'})
  @UseGuards(JwtAuthGuard)
  toggleDone(@Args('id', {type: () => String}) id: string) {
    return this.taskService.toggleDone(id)
  }

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.deleteTask(id);
  }
}
