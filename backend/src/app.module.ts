import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { LeadsModule } from './modules/leads/leads.module';
import { CaseStudiesModule } from './modules/case-studies/case-studies.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { MediaModule } from './modules/media/media.module';
import { SeoModule } from './modules/seo/seo.module';

@Module({
    imports: [
        // Environment configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Rate limiting — 60 requests per minute per IP
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 60,
            },
        ]),

        // PostgreSQL connection via TypeORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const databaseUrl = configService.get<string>('DATABASE_URL');
                const isProduction = configService.get<string>('NODE_ENV') === 'production';

                if (databaseUrl) {
                    return {
                        type: 'postgres' as const,
                        url: databaseUrl,
                        autoLoadEntities: true,
                        synchronize: !isProduction,
                        logging: !isProduction,
                        ssl: { rejectUnauthorized: false }, // Render/Neon requires SSL
                    };
                }

                return {
                    type: 'postgres' as const,
                    host: configService.get<string>('DB_HOST', 'localhost'),
                    port: configService.get<number>('DB_PORT', 5432),
                    username: configService.get<string>('DB_USERNAME', 'defnix'),
                    password: configService.get<string>('DB_PASSWORD', 'defnix_dev'),
                    database: configService.get<string>('DB_NAME', 'defnix'),
                    autoLoadEntities: true,
                    synchronize: !isProduction,
                    logging: !isProduction,
                };
            },
        }),

        // Feature modules
        AuthModule,
        BlogModule,
        LeadsModule,
        CaseStudiesModule,
        NewsletterModule,
        AnalyticsModule,
        MediaModule,
        SeoModule,
    ],
})
export class AppModule { }
