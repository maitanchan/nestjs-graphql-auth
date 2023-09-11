import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = GqlExecutionContext.create(context).getContext();

        const authorizationHeader = ctx.req.headers.authorization

        if (authorizationHeader) {

            const token = authorizationHeader.split(" ")[1]

            try {

                const user = this.jwtService.verify(token)

                ctx.user = user

                return true

            } catch (error) {

                throw new HttpException("Invalid Token : " + error.message, HttpStatus.UNAUTHORIZED)

            }

        }
        else {

            return false

        }

    }

}
