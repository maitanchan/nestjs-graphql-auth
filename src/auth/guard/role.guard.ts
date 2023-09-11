import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Roles = {
    AMDIN: "ADMIN",
    NORMAL_USER: "NORMAL_USER"
}

export class RoleGuard implements CanActivate {

    public role: string

    constructor(role: string) {

        this.role = role

    }

    canActivate(context: ExecutionContext) {

        const ctx = GqlExecutionContext.create(context).getContext()

        const { role } = ctx.user

        if (role === this.role) {

            return true

        }

    }

}