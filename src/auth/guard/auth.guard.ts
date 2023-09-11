import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly userService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = GqlExecutionContext.create(context).getContext();

        const args = GqlExecutionContext.create(context).getArgs();

        const { email, password } = args;

        const user: User = await this.userService.findUserByEmail(email);

        if (user && user.password === password) {

            ctx.user = user;

            return true;

        } else {

            throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);

        }

    }

}
