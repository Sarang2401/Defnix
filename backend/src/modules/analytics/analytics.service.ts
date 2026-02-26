import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from './entities/analytics-event.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(AnalyticsEvent)
        private readonly eventRepository: Repository<AnalyticsEvent>,
    ) { }

    async trackEvent(data: Partial<AnalyticsEvent>): Promise<AnalyticsEvent> {
        const event = this.eventRepository.create(data);
        return this.eventRepository.save(event);
    }

    async getEventsByType(eventType: string): Promise<AnalyticsEvent[]> {
        return this.eventRepository.find({
            where: { eventType },
            order: { createdAt: 'DESC' },
            take: 100,
        });
    }

    async getSummary(): Promise<{ totalEvents: number; eventTypes: Record<string, number> }> {
        const totalEvents = await this.eventRepository.count();
        const raw = await this.eventRepository
            .createQueryBuilder('event')
            .select('event.event_type', 'eventType')
            .addSelect('COUNT(*)', 'count')
            .groupBy('event.event_type')
            .getRawMany<{ eventType: string; count: string }>();

        const eventTypes: Record<string, number> = {};
        for (const row of raw) {
            eventTypes[row.eventType] = parseInt(row.count, 10);
        }

        return { totalEvents, eventTypes };
    }
}
