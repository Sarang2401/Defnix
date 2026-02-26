import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import slugify from 'slugify';
import { BlogPost, PostStatus, Tag, Category } from './entities';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly postRepository: Repository<BlogPost>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(page = 1, limit = 10): Promise<{ posts: BlogPost[]; total: number }> {
        const [posts, total] = await this.postRepository.findAndCount({
            where: { status: PostStatus.PUBLISHED },
            order: { publishedAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { posts, total };
    }

    async findAllAdmin(page = 1, limit = 20): Promise<{ posts: BlogPost[]; total: number }> {
        const [posts, total] = await this.postRepository.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { posts, total };
    }

    async findBySlug(slug: string): Promise<BlogPost> {
        const post = await this.postRepository.findOne({ where: { slug } });
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async search(query: string): Promise<BlogPost[]> {
        return this.postRepository.find({
            where: [
                { title: ILike(`%${query}%`), status: PostStatus.PUBLISHED },
                { content: ILike(`%${query}%`), status: PostStatus.PUBLISHED },
            ],
            order: { publishedAt: 'DESC' },
            take: 20,
        });
    }

    async create(dto: CreatePostDto): Promise<BlogPost> {
        const slug = slugify(dto.title, { lower: true, strict: true });
        const readingTime = Math.ceil(dto.content.split(/\s+/).length / 200);

        const post = this.postRepository.create({
            ...dto,
            slug,
            readingTime,
            publishedAt: dto.status === PostStatus.PUBLISHED ? new Date() : null,
        });

        if (dto.tagIds?.length) {
            post.tags = await this.tagRepository.findByIds(dto.tagIds);
        }
        if (dto.categoryIds?.length) {
            post.categories = await this.categoryRepository.findByIds(dto.categoryIds);
        }

        return this.postRepository.save(post);
    }

    async update(id: string, dto: UpdatePostDto): Promise<BlogPost> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) throw new NotFoundException('Post not found');

        if (dto.title) {
            post.slug = slugify(dto.title, { lower: true, strict: true });
        }
        if (dto.content) {
            post.readingTime = Math.ceil(dto.content.split(/\s+/).length / 200);
        }
        if (dto.status === PostStatus.PUBLISHED && !post.publishedAt) {
            post.publishedAt = new Date();
        }

        Object.assign(post, dto);

        if (dto.tagIds) {
            post.tags = await this.tagRepository.findByIds(dto.tagIds);
        }
        if (dto.categoryIds) {
            post.categories = await this.categoryRepository.findByIds(dto.categoryIds);
        }

        return this.postRepository.save(post);
    }

    async remove(id: string): Promise<void> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) throw new NotFoundException('Post not found');
        await this.postRepository.remove(post);
    }

    async getAllTags(): Promise<Tag[]> {
        return this.tagRepository.find({ order: { name: 'ASC' } });
    }

    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find({ order: { name: 'ASC' } });
    }
}
