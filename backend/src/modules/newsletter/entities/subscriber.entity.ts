import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('newsletter_subscribers')
export class Subscriber {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ name: 'subscribed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    subscribedAt!: Date;

    @Column({ name: 'unsubscribed_at', type: 'timestamp', nullable: true })
    unsubscribedAt!: Date | null;
}
