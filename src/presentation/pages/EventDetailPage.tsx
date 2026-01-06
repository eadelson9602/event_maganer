'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useEventDetail, useDateFormat } from '../hooks';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EventDetailPageProps {
  eventId: number;
}

export default function EventDetailPage({ eventId }: EventDetailPageProps) {
  const router = useRouter();
  const { event, isLoading, error, deleteEvent, clearError } = useEventDetail(eventId);
  const { formatDate } = useDateFormat();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <ErrorAlert message="Event not found" />
          <Button onClick={() => router.push('/events')} className="mt-4">
            Back to list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <ErrorAlert message={error || ''} onClose={clearError} />

        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/events')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{event.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date and Time</h3>
              <p className="text-lg">{formatDate(event.date)}</p>
            </div>

            {event.place && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Place</h3>
                <p className="text-lg">{event.place}</p>
              </div>
            )}

            {event.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-lg">{event.description}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => router.push(`/events/${eventId}/edit`)}
                className="flex-1"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this event.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteEvent} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
