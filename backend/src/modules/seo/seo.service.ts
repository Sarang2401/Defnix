import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost, PostStatus } from '../blog/entities/blog-post.entity';
import { CaseStudy } from '../case-studies/entities/case-study.entity';

@Injectable()
export class SeoService {
    constructor(
        @InjectRepository(BlogPost)
        private readonly postRepository: Repository<BlogPost>,
        @InjectRepository(CaseStudy)
        private readonly caseStudyRepository: Repository<CaseStudy>,
    ) { }

    async generateSitemap(baseUrl: string): Promise<string> {
        const posts = await this.postRepository.find({
            where: { status: PostStatus.PUBLISHED },
            select: ['slug', 'updatedAt'],
        });

        const caseStudies = await this.caseStudyRepository.find({
            select: ['slug', 'createdAt'],
        });

        const staticPages = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/solutions', priority: '0.9', changefreq: 'monthly' },
            { url: '/solutions/soc2-failure-prevention', priority: '0.8', changefreq: 'monthly' },
            { url: '/solutions/cloud-insurance', priority: '0.8', changefreq: 'monthly' },
            { url: '/solutions/ai-soc-analyst', priority: '0.8', changefreq: 'monthly' },
            { url: '/blog', priority: '0.9', changefreq: 'daily' },
            { url: '/case-studies', priority: '0.7', changefreq: 'monthly' },
            { url: '/about', priority: '0.6', changefreq: 'monthly' },
            { url: '/contact', priority: '0.7', changefreq: 'monthly' },
        ];

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        for (const page of staticPages) {
            xml += `  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
        }

        for (const post of posts) {
            xml += `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        }

        for (const cs of caseStudies) {
            xml += `  <url>\n    <loc>${baseUrl}/case-studies/${cs.slug}</loc>\n    <lastmod>${cs.createdAt.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
        }

        xml += '</urlset>';
        return xml;
    }

    getRobotsTxt(baseUrl: string): string {
        return `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/api/v1/seo/sitemap.xml\n`;
    }
}
