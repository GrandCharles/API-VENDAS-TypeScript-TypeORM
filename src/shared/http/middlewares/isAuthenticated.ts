import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import authConfig from '@config/authConfig';

interface ITokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
):
    void {
    const autHeader = request.headers.authorization;
    if (!autHeader) {
        throw new AppError('Token não encontrado!');
    }

    // Bearer - passar par arrai e pegar a segund posição
    const [, token] = autHeader.split(' ');

    // Verifica se o token é válido
    try {
        const decodedToken = verify(token, authConfig.token.secret);
        //console.log(decodedToken);

        const { sub } = decodedToken as ITokenPayload;
        request.usuario = {
            id: sub
        }

        return next();
    } catch {
        throw new AppError('Token inválido!');
    }
}

