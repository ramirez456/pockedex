import { Controller, Get, Post, Body } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  // @Post()
  // create(@Body() createSeedDto) {
  //   return this.seedService.create(createSeedDto);
  // }

  @Get() 
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
