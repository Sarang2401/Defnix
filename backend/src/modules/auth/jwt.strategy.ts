import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AdminUser } from './entities/admin-user.entity';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        const secretKey = configService.get<string>('JWT_SECRET', 'defnix-dev-secret-change-in-production');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,
        });
    }

    async validate(payload: JwtPayload): Promise<AdminUser> {
        const user = await this.authService.findById(payload.sub);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
