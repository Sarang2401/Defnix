import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
    constructor(
        @InjectRepository(Lead)
        private readonly leadRepository: Repository<Lead>,
    ) { }

    async create(dto: CreateLeadDto): Promise<Lead> {
        const lead = this.leadRepository.create(dto);
        return this.leadRepository.save(lead);
    }

    async findAll(page = 1, limit = 20): Promise<{ leads: Lead[]; total: number }> {
        const [leads, total] = await this.leadRepository.findAndCount({
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        return { leads, total };
    }

    async updateStatus(id: string, status: string): Promise<Lead> {
        await this.leadRepository.update(id, { status: status as Lead['status'] });
        const lead = await this.leadRepository.findOne({ where: { id } });
        if (!lead) throw new Error('Lead not found');
        return lead;
    }
}
