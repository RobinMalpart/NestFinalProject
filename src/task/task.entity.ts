import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('tasks')
export class Task {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    @Column()
    userId: string;

    @Column()
    priority: number;
}
