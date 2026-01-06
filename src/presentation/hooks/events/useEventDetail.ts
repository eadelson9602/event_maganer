import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEventStore } from '../../stores/event.store';

export function useEventDetail(eventId: number) {
  const router = useRouter();
  const { currentEvent, isLoading, error, fetchEventById, deleteEvent, clearError } = useEventStore();

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId).catch(() => {
        // Error handled by store
      });
    }
  }, [eventId, fetchEventById]);

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId);
      router.push('/events');
    } catch {
      // Error handled by store
    }
  };

  return {
    event: currentEvent,
    isLoading,
    error,
    deleteEvent: handleDelete,
    clearError,
  };
}

