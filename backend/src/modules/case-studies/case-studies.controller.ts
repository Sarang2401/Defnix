import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CaseStudiesService } from './case-studies.service';
import { JwtAuthGuard } from '../../common/guards';
import { CaseStudy } from './entities/case-study.entity';

@Controller('case-studies')
export class CaseStudiesController {
    constructor(private readonly caseStudiesService: CaseStudiesService) { }

    @Get()
    async findAll(): Promise<CaseStudy[]> {
        return this.caseStudiesService.findAll();
    }

    @Get(':slug')
    async findBySlug(@Param('slug') slug: string): Promise<CaseStudy> {
        return this.caseStudiesService.findBySlug(slug);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: Partial<CaseStudy>): Promise<CaseStudy> {
        return this.caseStudiesService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<CaseStudy>): Promise<CaseStudy> {
        return this.caseStudiesService.update(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.caseStudiesService.remove(id);
    }
}
