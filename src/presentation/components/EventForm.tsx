'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEventForm } from '../hooks';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventFormProps {
  eventId?: number;
}

export default function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const {
    formData,
    validationErrors,
    isLoading,
    error,
    handleSubmit,
    updateField,
    clearError,
  } = useEventForm(eventId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/events')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{eventId ? 'Edit Event' : 'New Event'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <ErrorAlert message={error || ''} onClose={clearError} />

              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
                {validationErrors.name && (
                  <p className="text-sm text-destructive">{validationErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">
                  Date and Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  required
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                />
                {validationErrors.date && (
                  <p className="text-sm text-destructive">{validationErrors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  type="text"
                  value={formData.place}
                  onChange={(e) => updateField('place', e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/events')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
