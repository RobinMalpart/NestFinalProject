import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<User> {
        // Check if email already exists
        const isEmailExist = await this.usersRepository.findOne({
            where: { email },
        });
        if (isEmailExist) {
            throw new ConflictException('Email already exists');
        }
        // Create new user
        const newUser = this.usersRepository.create({ email });
        await this.usersRepository.save(newUser);

        return newUser;
    }

    getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

    getUser(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    create(email: string): Promise<User> {
        const user = new User();
        user.email = email;
        console.log('user :', user);
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async resetData(): Promise<void> {
        await this.usersRepository.clear();
    }
}
