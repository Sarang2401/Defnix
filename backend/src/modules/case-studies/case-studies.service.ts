import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { CaseStudy } from './entities/case-study.entity';

@Injectable()
export class CaseStudiesService {
    constructor(
        @InjectRepository(CaseStudy)
        private readonly caseStudyRepository: Repository<CaseStudy>,
    ) { }

    async findAll(): Promise<CaseStudy[]> {
        return this.caseStudyRepository.find({
            where: { publishedAt: undefined },
            order: { createdAt: 'DESC' },
        });
    }

    async findBySlug(slug: string): Promise<CaseStudy> {
        const cs = await this.caseStudyRepository.findOne({ where: { slug } });
        if (!cs) throw new NotFoundException('Case study not found');
        return cs;
    }

    async create(data: Partial<CaseStudy>): Promise<CaseStudy> {
        const slug = slugify(data.title || '', { lower: true, strict: true });
        const cs = this.caseStudyRepository.create({ ...data, slug });
        return this.caseStudyRepository.save(cs);
    }

    async update(id: string, data: Partial<CaseStudy>): Promise<CaseStudy> {
        const cs = await this.caseStudyRepository.findOne({ where: { id } });
        if (!cs) throw new NotFoundException('Case study not found');
        if (data.title) {
            data.slug = slugify(data.title, { lower: true, strict: true });
        }
        Object.assign(cs, data);
        return this.caseStudyRepository.save(cs);
    }

    async remove(id: string): Promise<void> {
        const cs = await this.caseStudyRepository.findOne({ where: { id } });
        if (!cs) throw new NotFoundException('Case study not found');
        await this.caseStudyRepository.remove(cs);
    }
}
