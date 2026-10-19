import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from '../schemas/policies/policy.schema';

const MAX_POINTS = 60;
const MAX_GROUPS = 30;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const points = (value: unknown) =>
  (Array.isArray(value) ? value : [])
    .slice(0, MAX_POINTS)
    .map((point) => text(point, 600))
    .filter(Boolean);

/** Whitelists and trims a request body into the stored shape. */
const clean = (body: Record<string, any>) => {
  const title = text(body?.title, 200);
  if (!title) throw new BadRequestException('Title is required');
  const order = Number(body?.order);
  return {
    title,
    // Cards keep the order they were added in; `order` is only set when sent.
    ...(body?.order !== undefined && Number.isFinite(order)
      ? { order: Math.trunc(order) }
      : {}),
    pointsHeading: text(body?.pointsHeading, 200),
    points: points(body?.points),
    groups: (Array.isArray(body?.groups) ? body.groups : [])
      .slice(0, MAX_GROUPS)
      .map((group: any) => ({
        subheading: text(group?.subheading, 200),
        points: points(group?.points),
      }))
      .filter((group) => group.subheading || group.points.length),
  };
};

@Injectable()
export class PoliciesService {
  constructor(
    @InjectModel(Policy.name) private readonly model: Model<Policy>,
  ) {}

  findAll() {
    return this.model.find().sort({ order: 1, _id: -1 }).lean().exec();
  }

  create(body: Record<string, any>) {
    return this.model.create(clean(body));
  }

  async update(id: string, body: Record<string, any>) {
    const updated = await this.model
      .findByIdAndUpdate(id, clean(body), { new: true })
      .lean()
      .exec();
    if (!updated) throw new NotFoundException('Policy not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Policy not found');
    return { message: 'Policy deleted' };
  }
}
