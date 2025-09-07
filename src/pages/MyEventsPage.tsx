import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, Heart } from 'lucide-react';
import { Event } from '../data/mockEvents';
import { eventService } from '../services/eventService';
import { useRSVP } from '../contexts/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EventTypeIcon from '../components/EventTypeIcon';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function MyEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { rsvpEvents, cancelRSVP } = useRSVP();

  useEffect(() => {
    const loadMyEvents = async () => {
      try {
        setLoading(true);
        
        if (rsvpEvents.length === 0) {
          setEvents([]);
          return;
        }

        // Load all events to filter by RSVP'd events
        const result = await eventService.getEvents({}, 1, 100);
        const myEvents = result.events.filter(event => rsvpEvents.includes(event.id));
        
        // Sort by date
        myEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        setEvents(myEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadMyEvents();
  }, [rsvpEvents]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCancelRSVP = (eventId: number) => {
    cancelRSVP(eventId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100">
            My Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Events you've registered for
          </p>
        </div>

        {events.length === 0 ? (
          <div className="py-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-gray-100 rounded-full dark:bg-gray-700">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">No events yet</h3>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                You haven't registered for any events. Start exploring and find events that interest you!
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/')}
              >
                Discover Events
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <Card key={event.id} hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3 space-x-3">
                        <EventTypeIcon type={event.type} />
                        <Badge variant="primary" size="sm">{event.type}</Badge>
                        <Badge variant="success" size="sm">✓ Registered</Badge>
                      </div>

                      <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-200 cursor-pointer dark:text-gray-100 hover:text-blue-600"
                          onClick={() => navigate(`/events/${event.id}`)}>
                        {event.title}
                      </h3>

                      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="w-4 h-4 mr-2 text-orange-600" />
                          {event.host}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col ml-6 space-y-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelRSVP(event.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900"
                      >
                        Cancel RSVP
                      </Button>
                    </div>
                  </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}