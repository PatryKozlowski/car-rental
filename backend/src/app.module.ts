import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CarsModule } from './cars/cars.module';
import { OptionsModule } from './options/options.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CarsModule, OptionsModule, PaymentModule, OrderModule],
  providers: [PrismaService],
})
export class AppModule {}
