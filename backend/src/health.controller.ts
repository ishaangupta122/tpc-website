import { Controller, Get } from '@nestjs/common';

/** For uptime monitors and load balancers. Public, and reveals nothing sensitive. */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', uptime: Math.round(process.uptime()) };
  }
}
