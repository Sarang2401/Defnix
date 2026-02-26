import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../../common/guards';
import { BlogPost, Tag, Category } from './entities';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    // Public endpoints
    @Get('posts')
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ): Promise<{ posts: BlogPost[]; total: number }> {
        return this.blogService.findAll(page, limit);
    }

    @Get('posts/:slug')
    async findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
        return this.blogService.findBySlug(slug);
    }

    @Get('search')
    async search(@Query('q') query: string): Promise<BlogPost[]> {
        return this.blogService.search(query || '');
    }

    @Get('tags')
    async getTags(): Promise<Tag[]> {
        return this.blogService.getAllTags();
    }

    @Get('categories')
    async getCategories(): Promise<Category[]> {
        return this.blogService.getAllCategories();
    }

    // Admin endpoints (protected)
    @UseGuards(JwtAuthGuard)
    @Get('admin/posts')
    async findAllAdmin(
        @Query('page') page = 1,
        @Query('limit') limit = 20,
    ): Promise<{ posts: BlogPost[]; total: number }> {
        return this.blogService.findAllAdmin(page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Post('posts')
    async create(@Body() dto: CreatePostDto): Promise<BlogPost> {
        return this.blogService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('posts/:id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdatePostDto,
    ): Promise<BlogPost> {
        return this.blogService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('posts/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.blogService.remove(id);
    }
}
