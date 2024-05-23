import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ObjectId } from 'mongodb';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        if (!ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid userId');
        }
        const tasks = await this.taskService.getUserTasks(userId);
        return tasks;
    }

    @Post()
    async createTask(
        @Body() body: { name: string; userId: string; priority: number },
    ) {
        const { name, userId, priority } = body;
        if (!name || !userId || !priority || priority < 1) {
            throw new BadRequestException('Invalid task data');
        }
        const task = await this.taskService.addTask(name, userId, priority);
        return task;
    }
}
