import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        return this.taskService.getUserTasks(userId);
    }

    @Post()
    async addTask(
        @Body() task: { name: string; userId: string; priority: number },
    ) {
        return this.taskService.addTask(task.name, task.userId, task.priority);
    }
}
