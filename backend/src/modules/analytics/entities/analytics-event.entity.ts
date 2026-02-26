import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('analytics_events')
export class AnalyticsEvent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'event_type' })
    eventType!: string;

    @Column({ type: 'jsonb', nullable: true })
    payload!: Record<string, unknown> | null;

    @Column({ name: 'session_id', type: 'varchar', nullable: true })
    sessionId!: string | null;

    @Column({ name: 'user_agent', type: 'varchar', nullable: true })
    userAgent!: string | null;

    @Column({ name: 'ip_address', type: 'varchar', nullable: true })
    ipAddress!: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
