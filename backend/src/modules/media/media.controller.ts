import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../../common/guards';
import { MediaAsset } from './entities/media-asset.entity';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<MediaAsset> {
        return this.mediaService.upload(file);
    }

    @Get()
    async findAll(): Promise<MediaAsset[]> {
        return this.mediaService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.mediaService.remove(id);
    }
}
