import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('case_studies')
export class CaseStudy {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ unique: true })
    slug!: string;

    @Column({ type: 'varchar', nullable: true })
    client!: string | null;

    @Column({ type: 'varchar', nullable: true })
    industry!: string | null;

    @Column({ type: 'text' })
    challenge!: string;

    @Column({ type: 'text' })
    solution!: string;

    @Column({ type: 'text' })
    results!: string;

    @Column({ name: 'cover_image', type: 'varchar', nullable: true })
    coverImage!: string | null;

    @Column({ name: 'published_at', type: 'timestamp', nullable: true })
    publishedAt!: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
