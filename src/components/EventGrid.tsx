import React from 'react';
import { Event } from '../data/mockEvents';
import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';

interface EventGridProps {
  events: Event[];
  loading: boolean;
}

export default function EventGrid({ events, loading }: EventGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📅</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No events found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms to find more events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}