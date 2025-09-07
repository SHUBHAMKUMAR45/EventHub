import { Event, mockEvents } from '../data/mockEvents';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface EventFilters {
  type?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface CreateEventData {
  title: string;
  type: string;
  date: string;
  location: string;
  host: string;
  description: string;
}

let events = [...mockEvents];
let nextId = Math.max(...mockEvents.map(e => e.id)) + 1;

export const eventService = {
  async getEvents(filters: EventFilters = {}, page = 1, limit = 9): Promise<{ events: Event[], total: number }> {
    await delay(500); // Simulate API delay
    
    let filteredEvents = [...events];

    // Apply filters
    if (filters.type) {
      filteredEvents = filteredEvents.filter(event => event.type === filters.type);
    }

    if (filters.location) {
      filteredEvents = filteredEvents.filter(event => event.location === filters.location);
    }

    if (filters.dateFrom) {
      filteredEvents = filteredEvents.filter(event => event.date >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      filteredEvents = filteredEvents.filter(event => event.date <= filters.dateTo!);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.host.toLowerCase().includes(searchLower)
      );
    }

    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const total = filteredEvents.length;
    const startIndex = (page - 1) * limit;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);

    return {
      events: paginatedEvents,
      total
    };
  },

  async getEventById(id: number): Promise<Event | null> {
    await delay(300);
    return events.find(event => event.id === id) || null;
  },

  async createEvent(eventData: CreateEventData): Promise<Event> {
    await delay(500);
    const newEvent: Event = {
      ...eventData,
      id: nextId++
    };
    events.push(newEvent);
    return newEvent;
  }
};