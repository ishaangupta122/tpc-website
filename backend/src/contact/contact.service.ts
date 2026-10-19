import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from '../schemas/contact/contact.schema';

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const PHONE = /^\+?[\d\s-]{7,15}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Whitelists and checks a request body. */
const clean = (body: Record<string, any>) => {
  const name = text(body?.name, 200);
  const address = (typeof body?.address === 'string' ? body.address : '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6)
    .join('\n');
  const phones = (Array.isArray(body?.phones) ? body.phones : [])
    .map((phone: unknown) => text(phone, 20))
    .filter(Boolean)
    .slice(0, 6);
  const email = text(body?.email, 200);

  if (!name) throw new BadRequestException('College name is required');
  if (!address) throw new BadRequestException('Address is required');
  if (phones.length === 0)
    throw new BadRequestException('At least one phone number is required');
  if (phones.some((phone: string) => !PHONE.test(phone)))
    throw new BadRequestException('Phone numbers must be 7 to 15 digits');
  if (!EMAIL.test(email))
    throw new BadRequestException('A valid email is required');

  return { name, address, phones, email, hours: text(body?.hours, 200) };
};

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly model: Model<Contact>,
  ) {}

  /** The saved details, or an empty object until something has been saved. */
  async get() {
    return (await this.model.findOne().lean().exec()) ?? {};
  }

  save(body: Record<string, any>) {
    return this.model
      .findOneAndUpdate({}, clean(body), {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      })
      .lean()
      .exec();
  }
}
