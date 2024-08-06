import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtGuard } from "./guard/jwt.guard";

@Module({

    imports: [

        UsersModule,

        JwtModule.register({

            secret: 'key',

            signOptions: { expiresIn: '1h' }

        })

    ],

    providers: [

        AuthResolver,

        AuthService,

        AuthGuard,

        JwtGuard

    ]

})
export class AuthModule { }