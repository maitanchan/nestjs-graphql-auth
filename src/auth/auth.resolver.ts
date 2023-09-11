import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";
import { User } from "../users/entities/user.entity";
import { JwtGuard } from "./guard/jwt.guard";
import { RoleGuard, Roles } from "./guard/role.guard";

@Resolver(() => String)
export class AuthResolver {

    constructor(private readonly authAuthService: AuthService) { }

    @Query(() => String)
    @UseGuards(AuthGuard)
    login(
        @Args({ name: 'email', type: () => String }) email: string,
        @Args({ name: 'password', type: () => String }) password: string,
        @Context('user') user: User
    ) {

        return this.authAuthService.login(user)

    }

    @Query(() => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.AMDIN))
    securedDataAdmin(@Context('user') user: any) {

        return this.authAuthService.securedDataAdmin(user)

    }

    @Query(() => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
    securedDataUser(@Context('user') user: any) {

        return this.authAuthService.securedDataUser(user)

    }

}