import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { AdminUser } from '../src/modules/auth/entities/admin-user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
    const email = 'admin@defnix.com';
    const password = 'Admin@123';
    const passwordHash = await bcrypt.hash(password, 10);

    const ds = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5433'),
        username: process.env.DB_USER || 'defnix',
        password: process.env.DB_PASSWORD || 'defnix_dev',
        database: process.env.DB_NAME || 'defnix',
        entities: [AdminUser],
        synchronize: false,
    });

    await ds.initialize();

    // Upsert — safe to run multiple times
    await ds
        .createQueryBuilder()
        .insert()
        .into(AdminUser)
        .values({ email, passwordHash, role: 'admin' })
        .orUpdate(['password_hash', 'role'], ['email'])
        .execute();

    console.log('✅ Admin created successfully!');
    console.log(`   Email   : ${email}`);
    console.log(`   Password: ${password}`);
    await ds.destroy();
}

createAdmin().catch((err) => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
});
