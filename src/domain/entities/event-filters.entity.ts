export interface EventFilters {
  name?: string;
  place?: string;
  startDate?: string; // ISO 8601
  endDate?: string; // ISO 8601
  sortBy?: 'name' | 'date' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

