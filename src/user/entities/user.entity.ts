import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  username: string
}
