'use client';

import { Search, X } from 'lucide-react';
import { useEventSearch } from '../hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventFilters } from '../../domain/entities/event-filters.entity';

interface EventSearchProps {
  filters: EventFilters;
  onSearch: (filters: EventFilters) => void;
  onClear: () => void;
}

export default function EventSearch({ filters, onSearch, onClear }: EventSearchProps) {
  const {
    filters: localFilters,
    isExpanded,
    hasActiveFilters,
    updateFilter,
    clearFilters,
    toggleExpanded,
  } = useEventSearch(filters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleClear = () => {
    clearFilters();
    onClear();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search Events</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            aria-label={isExpanded ? 'Collapse search' : 'Expand search'}
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Event name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Search by name..."
                  value={localFilters.name || ''}
                  onChange={(e) => updateFilter('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  type="text"
                  placeholder="Search by place..."
                  value={localFilters.place || ''}
                  onChange={(e) => updateFilter('place', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Date from</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={localFilters.startDate || ''}
                  onChange={(e) => updateFilter('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Date to</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={localFilters.endDate || ''}
                  onChange={(e) => updateFilter('endDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortBy">Sort by</Label>
                <Select
                  value={localFilters.sortBy || 'date'}
                  onValueChange={(value) =>
                    updateFilter('sortBy', value as 'name' | 'date' | 'createdAt')
                  }
                >
                  <SelectTrigger id="sortBy">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="createdAt">Creation date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Order</Label>
                <Select
                  value={localFilters.sortOrder || 'ASC'}
                  onValueChange={(value) => updateFilter('sortOrder', value as 'ASC' | 'DESC')}
                >
                  <SelectTrigger id="sortOrder">
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASC">Ascending</SelectItem>
                    <SelectItem value="DESC">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
              {hasActiveFilters && (
                <Button type="button" variant="outline" onClick={handleClear}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
