import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import * as request from 'supertest';

// This is the main test suite for the UserController
describe('UserController', () => {
    let app: INestApplication;
    let userService: UserService;

    // This is a nested describe block for testing the POST /user endpoint
    describe('POST /', () => {
        // This function is executed before each test case
        beforeEach(async () => {
            // Create a new Nest application
            app = await createNestApplication();
            // Get an instance of the UserService from the application
            userService = app.get(UserService);

            // Initialize the application
            await app.init();
        });

        // This function is executed after each test case
        afterEach(async () => {
            // Reset the data in the UserService
            await userService.resetData();
            // Close the application
            await app.close();
        });

        // This test case checks if the server returns an HTTP error status 400 when given user is not valid
        it.only('should return an HTTP error status 400 when given user is not valid', async () => {
            const invalidPayloads = [
                { email: '' },
                { email: 'name' },
                { email: 'name@' },
                { email: 'name@test' },
                { email: 'name@test.' },
            ];

            for (const payload of invalidPayloads) {
                const response = await request(app.getHttpServer())
                    .post('/user')
                    .send(payload);

                expect(response.status).toBe(400);
            }
        });

        // This test case checks if the server returns an HTTP status 201 when given user has been created
        it.only('should return an HTTP status 201 when given user has been created', async () => {
            const validPayloads = [
                { email: 'name_1@test.com' },
                { email: 'name_2@test.com' },
                { email: 'name_3@test.com' },
                { email: 'name_4@test.com' },
            ];

            for (const payload of validPayloads) {
                const response = await request(app.getHttpServer())
                    .post('/user')
                    .send(payload);

                expect(response.status).toBe(201);

                const user = (await userService.getUser(payload.email)) as any;
                expect(user).toBeDefined();
                expect(user.email).toBe(payload.email);
            }
        });

        // This test case checks if the server returns an HTTP error status 409 when given user already exists
        it.only('should return an HTTP error status 409 when given user already exists', async () => {
            const payload = { email: 'name@test.com' };
            await userService.addUser(payload.email);

            const response = await request(app.getHttpServer())
                .post('/user')
                .send(payload);

            expect(response.status).toBe(409);
        });
    });
});

// This function creates a new Nest application
async function createNestApplication() {
    // Set the DATABASE_NAME environment variable to 'test_nestjs-final-test-db_USERS'
    process.env.DATABASE_NAME = 'test_nestjs-final-test-db_USERS';

    // Create a new testing module with the AppModule as an import
    const module = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    // Create a new Nest application from the testing module
    return module.createNestApplication();
}
