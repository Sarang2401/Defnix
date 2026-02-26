import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { CaseStudy } from '../case-studies/entities/case-study.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BlogPost, CaseStudy])],
    controllers: [SeoController],
    providers: [SeoService],
    exports: [SeoService],
})
export class SeoModule { }
