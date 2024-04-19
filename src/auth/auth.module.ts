import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthResolver} from './auth.resolver'
import {LocalStrategy} from "./strategies/local.strategy"
import {PassportModule} from "@nestjs/passport"
import {UserService} from "../user/user.service"
import {PrismaService} from "../prisma.service"
import {UserModule} from "../user/user.module"
import {JwtModule} from "@nestjs/jwt"
import {JwtStrategy} from "./strategies/jwt.strategy"

@Module({
    imports: [PassportModule, UserModule, JwtModule.register({
        signOptions: {expiresIn: '1h'},
        secret: process.env.JWT_SECRET,
    })],
    providers: [PrismaService, UserService, AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {
}
