import { Injectable } from '@nestjs/common';
import { Options } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Options[]> {
    try {
      const options = await this.prisma.options.findMany();

      return options;
    } catch (error) {
      console.log(error.message);
    }
  }
}
