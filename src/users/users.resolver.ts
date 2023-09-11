import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly userService: UsersService) { }

    @Query(() => User, { name: 'findUserByEmail' })
    findUserByEmail(@Args('email') email: string) {

        return this.userService.findUserByEmail(email)

    }

}