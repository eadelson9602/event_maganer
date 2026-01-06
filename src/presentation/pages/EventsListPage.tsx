'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useEvents, useDateFormat } from '../hooks';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import EventSearch from '../components/EventSearch';
import { useAuth } from '../hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventsListPage() {
  const router = useRouter();
  const { events, isLoading, error, filters, search, clearFilters, clearError } = useEvents();
  const { logout } = useAuth();
  const { formatDate } = useDateFormat();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>

        <ErrorAlert message={error || ''} onClose={clearError} />

        <EventSearch
          filters={filters}
          onSearch={search}
          onClear={clearFilters}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {events.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No events available</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    onClick={() => router.push(`/events/${event.id}`)}
                    className="cursor-pointer transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>{formatDate(event.date)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {event.place && (
                        <p className="text-sm text-muted-foreground mb-2">📍 {event.place}</p>
                      )}
                      {event.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Button
              onClick={() => router.push('/events/new')}
              size="icon"
              className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
              aria-label="Create new event"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
