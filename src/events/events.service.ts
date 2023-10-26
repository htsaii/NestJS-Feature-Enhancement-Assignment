import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Event } from './event.model';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async insertEvent(title: string, desc: string, price: number) {
    // const eveId = new Date().toString();
    // const { v4: uuidv4 } = require('uuid');
    // const eveId = uuidv4();

    const newEvent = new this.eventModel({
      title,
      description: desc,
      price,
    });
    const result = await newEvent.save();
    console.log(result);
    return result.id as string;
  }

  async getEvents() {
    const events = await this.eventModel.find().exec();
    return events.map((eve) => ({
      id: eve.id,
      title: eve.title,
      description: eve.description,
      price: eve.price,
    }));
  }

  async getSingleEvent(eventId: string) {
    const event = await this.findEvent(eventId);
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      price: event.price,
    };
  }

  async updateEvent(
    eventId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedEvent = await this.findEvent(eventId);
    if (title) {
      updatedEvent.title = title;
    }
    if (desc) {
      updatedEvent.description = desc;
    }
    if (price) {
      updatedEvent.price = price;
    }
    updatedEvent.save();
  }

  async deleteEvent(eveId: string) {
    const result = await this.eventModel.deleteOne({ _id: eveId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find event.');
    }
    // console.log(result);
  }

  private async findEvent(id: string): Promise<Event> {
    let event;
    try {
      event = await this.eventModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find Event.');
    }
    if (!event) {
      throw new NotFoundException('Could not find Event.');
    }
    return event;
  }
}
