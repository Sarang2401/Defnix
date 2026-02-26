import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './entities/admin-user.entity';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminUser)
        private readonly adminUserRepository: Repository<AdminUser>,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<AdminUser> {
        const user = await this.adminUserRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.validateUser(email, password);
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async findById(id: string): Promise<AdminUser | null> {
        return this.adminUserRepository.findOne({ where: { id } });
    }
}
