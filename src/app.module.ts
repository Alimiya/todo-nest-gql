import {Module} from '@nestjs/common'
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import {PrismaService} from "./prisma.service"
import {join} from 'path'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            buildSchemaOptions: {dateScalarMode: "timestamp"}
        }),
        TaskModule,
        UserModule,
        AuthModule,
    ],
    providers: [PrismaService],
})
export class AppModule {
}
