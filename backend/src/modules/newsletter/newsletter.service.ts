import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class NewsletterService {
    constructor(
        @InjectRepository(Subscriber)
        private readonly subscriberRepository: Repository<Subscriber>,
    ) { }

    async subscribe(email: string): Promise<Subscriber> {
        const existing = await this.subscriberRepository.findOne({ where: { email } });
        if (existing && !existing.unsubscribedAt) {
            throw new ConflictException('Email is already subscribed');
        }
        if (existing) {
            existing.unsubscribedAt = null;
            return this.subscriberRepository.save(existing);
        }
        const subscriber = this.subscriberRepository.create({ email });
        return this.subscriberRepository.save(subscriber);
    }

    async unsubscribe(email: string): Promise<void> {
        await this.subscriberRepository.update({ email }, { unsubscribedAt: new Date() });
    }

    async findAll(): Promise<Subscriber[]> {
        return this.subscriberRepository.find({
            where: { unsubscribedAt: undefined },
            order: { subscribedAt: 'DESC' },
        });
    }
}
