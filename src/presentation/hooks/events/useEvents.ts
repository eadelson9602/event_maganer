import { useEffect } from 'react';
import { useEventStore } from '../../stores/event.store';
import { EventFilters } from '../../../domain/entities/event-filters.entity';

export function useEvents() {
  const { events, isLoading, error, filters, fetchEvents, clearFilters, clearError } = useEventStore();

  useEffect(() => {
    fetchEvents().catch(() => {
      // Error handled by store
    });
  }, [fetchEvents]);

  const handleSearch = (searchFilters: EventFilters) => {
    fetchEvents(searchFilters).catch(() => {
      // Error handled by store
    });
  };

  const handleClearFilters = () => {
    clearFilters();
    fetchEvents({}).catch(() => {
      // Error handled by store
    });
  };

  return {
    events,
    isLoading,
    error,
    filters,
    search: handleSearch,
    clearFilters: handleClearFilters,
    clearError,
  };
}

