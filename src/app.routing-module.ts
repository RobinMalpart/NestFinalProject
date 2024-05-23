import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
// import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
    exports: [RouterModule],
    //TaskModule
    imports: [RouterModule.register(routes), UserModule, TaskModule],
})
export class AppRoutingModule {}
