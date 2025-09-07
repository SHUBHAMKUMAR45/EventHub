import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { eventTypes, locations } from '../data/mockEvents';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

export interface FilterState {
  type: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} icon={X}>
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <Input
          label="Search Events"
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search by title, description, or host..."
          icon={Search}
        />

        {/* Event Type */}
        <Select
          label="Event Type"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          options={[
            { value: '', label: 'All Types' },
            ...eventTypes.map(type => ({ value: type, label: type }))
          ]}
        />

        {/* Location */}
        <Select
          label="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          options={[
            { value: '', label: 'All Locations' },
            ...locations.map(location => ({ value: location, label: location }))
          ]}
        />

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="From Date"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          />
          <Input
            label="To Date"
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}