import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ConfigService, PrismaService],
})
export class OrderModule {}
