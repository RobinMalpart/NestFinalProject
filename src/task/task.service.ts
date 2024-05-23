import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const task = new Task();
        task.name = name;
        task.userId = userId;
        task.priority = priority;
        this.tasks.push(task);
        return task;
    }

    async getTaskByName(name: string): Promise<Task | undefined> {
        return this.tasks.find((task) => task.name === name);
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return this.tasks.filter((task) => task.userId === userId);
    }

    async resetData(): Promise<void> {
        this.tasks = [];
    }
}
