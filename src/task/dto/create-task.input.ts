import {Field, InputType} from "@nestjs/graphql";
import {IsString} from "class-validator";

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  userId: string
}
