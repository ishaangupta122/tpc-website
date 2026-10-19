import { Body, Controller, Get, Put } from '@nestjs/common';
import { ContactService } from './contact.service';

/**
 * College contact details. Reading is public; saving needs an admin token
 * (global guard). Body: { name, address, phones[], email, hours }.
 */
@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Put()
  save(@Body() body: Record<string, any>) {
    return this.service.save(body);
  }
}
