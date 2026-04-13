import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		// Converte o contexto genérico para o contexto GraphQL
		const ctx = GqlExecutionContext.create(context);
		const { req } = ctx.getContext();

		// Lógica de autenticação (ex: verificar req.user)
		return req.isAuthenticated(); // Retorna true ou false
	}
}
