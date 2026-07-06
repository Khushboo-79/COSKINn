import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _client: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this._client = new PrismaClient({ adapter });
    
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop as keyof PrismaService];
        }
        const clientProp = target._client[prop as keyof PrismaClient];
        if (typeof clientProp === 'function') {
          return clientProp.bind(target._client);
        }
        return clientProp;
      },
    }) as any;
  }
  
  async onModuleInit() {
    await this._client.$connect();
  }

  async onModuleDestroy() {
    await this._client.$disconnect();
  }
}

// This merges the PrismaClient types into PrismaService without extending the class!
export interface PrismaService extends PrismaClient {}

