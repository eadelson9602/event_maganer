import { Event } from '../entities/event.entity';
import { EventFilters } from '../entities/event-filters.entity';

export interface IEventRepository {
  findAll(simple?: boolean, filters?: EventFilters): Promise<Event[]>;
  findById(id: number): Promise<Event>;
  create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  update(id: number, event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Event>;
  delete(id: number): Promise<void>;
}

