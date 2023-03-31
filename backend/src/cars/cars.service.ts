import { Injectable } from '@nestjs/common';
import { Cars } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Cars[]> {
    try {
      const cars = await this.prisma.cars.findMany();

      return cars;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: number): Promise<Cars> {
    try {
      return this.prisma.cars.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
