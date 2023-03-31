import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Stripe } from 'stripe';
import { CreatePaymentDto, TransformedMetadata } from './dto/payment.dto';

interface EventDataCustomer extends Stripe.Event.Data.Object {
  id: string;
  customer: string;
  payment_status: string;
}

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(
    car: CreatePaymentDto[],
  ): Promise<{ id: string }> {
    const customer = await this.stripe.customers.create({
      metadata: {
        email: car.map((c) => c.email)[0],
        cart: JSON.stringify(
          car.map((c) => ({
            id: c.carID,
            name: c.name,
            email: c.email,
            brand: c.brand,
            price: c.price,
            options: c.options,
            pickUp: c.pickUp,
            dropOff: c.dropOff,
            days: c.days,
            deliveryPlace: c.placeDelivery,
          })),
        ),
      },
    });

    const storedCar = car.map((c) => {
      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: c.brand,
          },
          unit_amount: c.price * 100,
        },
        quantity: 1,
      };
    });
    const session = await this.stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: storedCar,
      success_url: `${this.configService.get('PUBLIC_URL')}/order`,
      cancel_url: `${this.configService.get('PUBLIC_URL')}`,
    });
    return { id: session.id };
  }

  async handleWebhook(payload: Buffer, sig: string) {
    const STRIPE_WEBHOOK = this.configService.get('STRIPE_WEBHOOK_KEY');
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        STRIPE_WEBHOOK,
      );

      switch (event.type) {
        case 'customer.created':
          break;
        case 'customer.updated':
          break;
        case 'charge.succeeded':
          break;
        case 'payment_intent.succeeded':
          break;
        case 'payment_intent.created':
          break;
        case 'checkout.session.completed':
          {
            const data = event?.data?.object as EventDataCustomer;

            try {
              const customerData: Stripe.Customer | Stripe.DeletedCustomer =
                await this.stripe.customers.retrieve(data.customer);
              if (
                customerData instanceof Object &&
                'metadata' in customerData
              ) {
                const transformedCutomerData: TransformedMetadata[] =
                  JSON.parse(customerData.metadata.cart);

                const carID = transformedCutomerData.map((c) => c.id)[0];

                const options = transformedCutomerData.map((c) => c.options)[0];
                const onlyOptions = options.map((o) => o.option);

                const transformedPickUp = new Date(
                  transformedCutomerData.map((c) => c.pickUp)[0],
                ).toISOString();

                const tramsfomedDropOff = new Date(
                  transformedCutomerData.map((c) => c.dropOff)[0],
                ).toISOString();

                try {
                  await this.prisma.cars.update({
                    where: {
                      id: carID,
                    },
                    data: {
                      available: false,
                      dropOff: tramsfomedDropOff,
                    },
                  });
                } catch (error) {
                  console.log(error);
                }

                try {
                  await this.prisma.order.create({
                    data: {
                      carId: carID,
                      sessionID: data.id,
                      name: transformedCutomerData.map((c) => c.name)[0],
                      email: transformedCutomerData.map((c) => c.email)[0],
                      brand: transformedCutomerData.map((c) => c.brand)[0],
                      price: transformedCutomerData.map((c) => c.price)[0],
                      pickUp: transformedPickUp,
                      dropOff: tramsfomedDropOff,
                      options: onlyOptions,
                      days: transformedCutomerData.map((c) => c.days)[0],
                      deliveryPlace: transformedCutomerData.map(
                        (c) => c.deliveryPlace,
                      )[0],
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
