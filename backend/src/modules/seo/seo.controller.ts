import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SeoService } from './seo.service';

@Controller('seo')
export class SeoController {
    constructor(
        private readonly seoService: SeoService,
        private readonly configService: ConfigService,
    ) { }

    @Get('sitemap.xml')
    async sitemap(@Res() res: Response): Promise<void> {
        const baseUrl = this.configService.get<string>('SITE_URL', 'https://defnix.com');
        const xml = await this.seoService.generateSitemap(baseUrl);
        res.set('Content-Type', 'application/xml');
        res.send(xml);
    }

    @Get('robots.txt')
    robotsTxt(@Res() res: Response): void {
        const baseUrl = this.configService.get<string>('SITE_URL', 'https://defnix.com');
        res.set('Content-Type', 'text/plain');
        res.send(this.seoService.getRobotsTxt(baseUrl));
    }
}
