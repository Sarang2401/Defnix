import { IsString, IsOptional, IsEnum, IsArray, MinLength } from 'class-validator';
import { PostStatus } from '../entities/blog-post.entity';

export class CreatePostDto {
    @IsString()
    @MinLength(1)
    title!: string;

    @IsString()
    content!: string;

    @IsString()
    @IsOptional()
    excerpt?: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsString()
    @IsOptional()
    authorId?: string;

    @IsEnum(PostStatus)
    @IsOptional()
    status?: PostStatus;

    @IsString()
    @IsOptional()
    seoTitle?: string;

    @IsString()
    @IsOptional()
    seoDescription?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categoryIds?: string[];
}

export class UpdatePostDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    excerpt?: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsString()
    @IsOptional()
    authorId?: string;

    @IsEnum(PostStatus)
    @IsOptional()
    status?: PostStatus;

    @IsString()
    @IsOptional()
    seoTitle?: string;

    @IsString()
    @IsOptional()
    seoDescription?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagIds?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categoryIds?: string[];
}
