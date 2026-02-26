import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../../common/guards';
import { Lead } from './entities/lead.entity';

@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    async create(@Body() dto: CreateLeadDto): Promise<Lead> {
        return this.leadsService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 20,
    ): Promise<{ leads: Lead[]; total: number }> {
        return this.leadsService.findAll(page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<Lead> {
        return this.leadsService.updateStatus(id, status);
    }
}
