import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: string): Promise<Order> {
    try {
      return this.prisma.order.findUnique({
        where: {
          sessionID: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
