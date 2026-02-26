import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseStudiesController } from './case-studies.controller';
import { CaseStudiesService } from './case-studies.service';
import { CaseStudy } from './entities/case-study.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CaseStudy])],
    controllers: [CaseStudiesController],
    providers: [CaseStudiesService],
    exports: [CaseStudiesService],
})
export class CaseStudiesModule { }
