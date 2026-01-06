import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
      toast.success('Event deleted successfully');
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

