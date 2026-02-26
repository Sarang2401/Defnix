import { Controller, Post, Get, Delete, Body, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../../common/guards';
import { Subscriber } from './entities/subscriber.entity';

@Controller('newsletter')
export class NewsletterController {
    constructor(private readonly newsletterService: NewsletterService) { }

    @Post('subscribe')
    async subscribe(@Body('email') email: string): Promise<Subscriber> {
        return this.newsletterService.subscribe(email);
    }

    @Delete('unsubscribe')
    async unsubscribe(@Body('email') email: string): Promise<void> {
        return this.newsletterService.unsubscribe(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('subscribers')
    async findAll(): Promise<Subscriber[]> {
        return this.newsletterService.findAll();
    }
}
