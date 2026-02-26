import { Controller, Post, Get, Body, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards';
import { AnalyticsEvent } from './entities/analytics-event.entity';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('events')
    async trackEvent(
        @Body() data: { eventType: string; payload?: Record<string, unknown>; sessionId?: string },
        @Req() req: Request,
    ): Promise<AnalyticsEvent> {
        return this.analyticsService.trackEvent({
            eventType: data.eventType,
            payload: data.payload || null,
            sessionId: data.sessionId || null,
            userAgent: req.headers['user-agent'] || null,
            ipAddress: req.ip || null,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('events')
    async getEvents(@Query('type') eventType: string): Promise<AnalyticsEvent[]> {
        return this.analyticsService.getEventsByType(eventType);
    }

    @UseGuards(JwtAuthGuard)
    @Get('summary')
    async getSummary(): Promise<{ totalEvents: number; eventTypes: Record<string, number> }> {
        return this.analyticsService.getSummary();
    }
}
