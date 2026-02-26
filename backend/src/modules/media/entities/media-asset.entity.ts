import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('media_assets')
export class MediaAsset {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    filename!: string;

    @Column()
    url!: string;

    @Column({ name: 'mime_type' })
    mimeType!: string;

    @Column({ type: 'int' })
    size!: number;

    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt!: Date;
}
