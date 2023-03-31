import { Options } from '@prisma/client';

export class CreatePaymentDto {
  name: string;
  email: string;
  carID: number;
  brand: string;
  price: number;
  options: Array<Options>;
  pickUp: Date;
  dropOff: Date;
  days: number;
  placeDelivery: string;
}

export class TransformedMetadata {
  id: number;
  name: string;
  email: string;
  brand: string;
  price: number;
  options: Array<Options>;
  pickUp: Date;
  dropOff: Date;
  days: number;
  deliveryPlace: string;
}
