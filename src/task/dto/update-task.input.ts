import { CreateTaskInput } from './create-task.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import {IsString} from "class-validator";

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field()
  @IsString()
  id: string
}
