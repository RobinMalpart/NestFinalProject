import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ObjectIdColumn,
} from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id: number;

    @Column({ unique: true })
    email: string;
}
