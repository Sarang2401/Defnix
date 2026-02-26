import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MediaAsset } from './entities/media-asset.entity';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(MediaAsset)
        private readonly mediaRepository: Repository<MediaAsset>,
    ) { }

    async upload(file: Express.Multer.File): Promise<MediaAsset> {
        // In production, upload to S3/R2 and get the URL
        // For now, store metadata with a local placeholder URL
        const ext = file.originalname.split('.').pop();
        const filename = `${uuidv4()}.${ext}`;
        const url = `/uploads/${filename}`;

        const asset = this.mediaRepository.create({
            filename,
            url,
            mimeType: file.mimetype,
            size: file.size,
        });

        return this.mediaRepository.save(asset);
    }

    async findAll(): Promise<MediaAsset[]> {
        return this.mediaRepository.find({ order: { uploadedAt: 'DESC' } });
    }

    async remove(id: string): Promise<void> {
        await this.mediaRepository.delete(id);
    }
}
