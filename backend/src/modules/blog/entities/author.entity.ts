import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text', nullable: true })
    bio!: string | null;

    @Column({ name: 'avatar_url', type: 'text', nullable: true })
    avatarUrl!: string | null;
}
