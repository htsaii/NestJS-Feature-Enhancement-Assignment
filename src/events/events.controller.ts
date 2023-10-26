import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async addEvents(
    @Body('title') eveTitle: string,
    @Body('description') eveDesc: string,
    @Body('price') evePrice: number,
  ) {
    const generatedId = await this.eventsService.insertEvent(
      eveTitle,
      eveDesc,
      evePrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllEvents() {
    const events = await this.eventsService.getEvents();
    return events;
  }

  @Get(':id')
  getEvent(@Param('id') eveId: string) {
    return this.eventsService.getSingleEvent(eveId);
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') eveId: string,
    @Body('title') eveTitle: string,
    @Body('description') eveDesc: string,
    @Body('price') evePrice: number,
  ) {
    await this.eventsService.updateEvent(eveId, eveTitle, eveDesc, evePrice);
    return null;
  }

  @Delete(':id')
  async removeEvent(@Param('id') eveId: string) {
    await this.eventsService.deleteEvent(eveId);
    return null;
  }
}
