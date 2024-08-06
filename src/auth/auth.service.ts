import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    login(user: User): string {

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }

        const token = this.jwtService.sign(payload)

        return token

    }

    securedDataAdmin(user: any): string {

        return 'Secured data for Admin' + JSON.stringify(user)

    }

    securedDataUser(user: any): string {

        return 'Secured data for User' + JSON.stringify(user)

    }

}