import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
} from 'typeorm';
import { Author } from './author.entity';
import { Tag } from './tag.entity';
import { Category } from './category.entity';

export enum PostStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

@Entity('blog_posts')
export class BlogPost {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ unique: true })
    slug!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'text', nullable: true })
    excerpt!: string | null;

    @Column({ name: 'cover_image', type: 'varchar', nullable: true })
    coverImage!: string | null;

    @ManyToOne(() => Author, { eager: true, nullable: true })
    @JoinColumn({ name: 'author_id' })
    author!: Author | null;

    @Column({ name: 'author_id', type: 'varchar', nullable: true })
    authorId!: string | null;

    @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
    status!: PostStatus;

    @Column({ name: 'reading_time', default: 0 })
    readingTime!: number;

    @Column({ name: 'seo_title', type: 'varchar', nullable: true })
    seoTitle!: string | null;

    @Column({ name: 'seo_description', type: 'varchar', nullable: true })
    seoDescription!: string | null;

    @ManyToMany(() => Tag, { eager: true })
    @JoinTable({
        name: 'post_tags',
        joinColumn: { name: 'post_id' },
        inverseJoinColumn: { name: 'tag_id' },
    })
    tags!: Tag[];

    @ManyToMany(() => Category, { eager: true })
    @JoinTable({
        name: 'post_categories',
        joinColumn: { name: 'post_id' },
        inverseJoinColumn: { name: 'category_id' },
    })
    categories!: Category[];

    @Column({ name: 'published_at', type: 'timestamp', nullable: true })
    publishedAt!: Date | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
