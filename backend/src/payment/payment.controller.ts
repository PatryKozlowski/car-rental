import {
  Controller,
  Post,
  Body,
  Req,
  RawBodyRequest,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createSession(@Body() createPaymentDto: CreatePaymentDto[]) {
    return this.paymentService.createCheckoutSession(createPaymentDto);
  }

  @Post('/webhook')
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    const rawBufferPayload = req.rawBody;
    if (!sig) {
      throw new BadRequestException('Missing stripe-signature header');
    }
    return await this.paymentService.handleWebhook(rawBufferPayload, sig);
  }
}
