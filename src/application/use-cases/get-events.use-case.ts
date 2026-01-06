import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';
import { EventFilters } from '../../domain/entities/event-filters.entity';

export class GetEventsUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(simple: boolean = true, filters?: EventFilters): Promise<Event[]> {
    return this.eventRepository.findAll(simple, filters);
  }
}

