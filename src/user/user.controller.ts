import {
    Controller,
    Post,
    Body,
    Get,
    BadRequestException,
    ConflictException,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    async create(@Body('email') email: string): Promise<string> {
        if (!this.isValidEmail(email)) {
            throw new BadRequestException(
                'Addresse email invalide. Veuillez saisir une adresse e-mail valide.',
            );
        }

        const existingUser = await this.userService.getUser(email);
        if (existingUser) {
            throw new ConflictException(
                'Email already exists. Please enter a different email.',
            );
        }

        const newUser = await this.userService.create(email);
        return 'User created';
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }
}
