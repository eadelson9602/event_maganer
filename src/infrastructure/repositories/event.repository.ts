import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';
import { EventFilters } from '../../domain/entities/event-filters.entity';
import { httpClient } from '../http/http-client';

export class EventRepository implements IEventRepository {
  async findAll(simple: boolean = true, filters?: EventFilters): Promise<Event[]> {
    const params = new URLSearchParams();
    params.append('simple', simple.toString());
    
    if (filters) {
      if (filters.name) params.append('name', filters.name);
      if (filters.place) params.append('place', filters.place);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    }
    
    const response = await httpClient.get<Event[] | { data: Event[] }>(
      `/events?${params.toString()}`
    );
    return Array.isArray(response) ? response : response.data;
  }

  async findById(id: number): Promise<Event> {
    return httpClient.get<Event>(`/events/${id}`);
  }

  async create(
    event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Event> {
    return httpClient.post<Event>('/events', event);
  }

  async update(
    id: number,
    event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Event> {
    return httpClient.put<Event>(`/events/${id}`, event);
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/events/${id}`);
  }
}

