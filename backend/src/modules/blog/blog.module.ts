import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogPost, Author, Tag, Category } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([BlogPost, Author, Tag, Category])],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService],
})
export class BlogModule { }
