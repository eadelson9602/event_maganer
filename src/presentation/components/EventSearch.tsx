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
          <CardTitle className="text-lg">Buscar Eventos</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            aria-label={isExpanded ? 'Contraer búsqueda' : 'Expandir búsqueda'}
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
                <Label htmlFor="name">Nombre del evento</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={localFilters.name || ''}
                  onChange={(e) => updateFilter('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">Lugar</Label>
                <Input
                  id="place"
                  type="text"
                  placeholder="Buscar por lugar..."
                  value={localFilters.place || ''}
                  onChange={(e) => updateFilter('place', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha desde</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={localFilters.startDate || ''}
                  onChange={(e) => updateFilter('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha hasta</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={localFilters.endDate || ''}
                  onChange={(e) => updateFilter('endDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortBy">Ordenar por</Label>
                <Select
                  value={localFilters.sortBy || 'date'}
                  onValueChange={(value) =>
                    updateFilter('sortBy', value as 'name' | 'date' | 'createdAt')
                  }
                >
                  <SelectTrigger id="sortBy">
                    <SelectValue placeholder="Seleccionar campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="date">Fecha</SelectItem>
                    <SelectItem value="createdAt">Fecha de creación</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder">Orden</Label>
                <Select
                  value={localFilters.sortOrder || 'ASC'}
                  onValueChange={(value) => updateFilter('sortOrder', value as 'ASC' | 'DESC')}
                >
                  <SelectTrigger id="sortOrder">
                    <SelectValue placeholder="Seleccionar orden" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASC">Ascendente</SelectItem>
                    <SelectItem value="DESC">Descendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              {hasActiveFilters && (
                <Button type="button" variant="outline" onClick={handleClear}>
                  <X className="mr-2 h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
