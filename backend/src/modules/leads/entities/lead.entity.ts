import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum LeadStatus {
    NEW = 'new',
    CONTACTED = 'contacted',
    QUALIFIED = 'qualified',
    CONVERTED = 'converted',
    CLOSED = 'closed',
}

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ type: 'varchar', nullable: true })
    company!: string | null;

    @Column({ type: 'text' })
    message!: string;

    @Column({ type: 'varchar', nullable: true })
    source!: string | null;

    @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
    status!: LeadStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
