import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 24000,
            database: 'test',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
