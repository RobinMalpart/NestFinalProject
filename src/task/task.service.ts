import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        if (!name || !userId || priority < 1) {
            throw new BadRequestException('Invalid task data');
        }
        const task = this.taskRepository.create({ name, userId, priority });
        return this.taskRepository.save(task);
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        if (!ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid userId');
        }
        return this.taskRepository.find({ where: { userId } });
    }

    async getTaskByName(name: string): Promise<Task | undefined> {
        return this.taskRepository.findOne({ where: { name } });
    }

    async resetData(): Promise<void> {
        await this.taskRepository.clear();
    }
}
