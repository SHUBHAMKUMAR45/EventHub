import React, { useState, useEffect, useCallback } from 'react';
import { eventService, EventFilters } from '../services/eventService';
import { Event } from '../data/mockEvents';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import EventGrid from '../components/EventGrid';
import Pagination from '../components/Pagination';
import { useApp } from '../contexts/AppContext';

const EVENTS_PER_PAGE = 9;

const initialFilters: FilterState = {
  type: '',
  location: '',
  dateFrom: '',
  dateTo: '',
  search: ''
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useApp();

  const loadEvents = useCallback(async (page: number, currentFilters: FilterState) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const apiFilters: EventFilters = {};
      if (currentFilters.type) apiFilters.type = currentFilters.type;
      if (currentFilters.location) apiFilters.location = currentFilters.location;
      if (currentFilters.dateFrom) apiFilters.dateFrom = currentFilters.dateFrom;
      if (currentFilters.dateTo) apiFilters.dateTo = currentFilters.dateTo;
      if (currentFilters.search) apiFilters.search = currentFilters.search;

      const result = await eventService.getEvents(apiFilters, page, EVENTS_PER_PAGE);
      setEvents(result.events);
      setTotalEvents(result.total);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load events. Please try again.' });
      setEvents([]);
      setTotalEvents(0);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadEvents(currentPage, filters);
  }, [currentPage, filters, loadEvents]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Discover Local Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find and join amazing community events happening near you. Connect with like-minded people and explore new experiences.
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
            {state.error}
          </div>
        )}

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            {!loading && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {totalEvents === 0 ? 'No events found' : (
                    <>
                      Showing {Math.min((currentPage - 1) * EVENTS_PER_PAGE + 1, totalEvents)} - {Math.min(currentPage * EVENTS_PER_PAGE, totalEvents)} of {totalEvents} events
                    </>
                  )}
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>
            )}

            <EventGrid events={events} loading={loading} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}