import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, Heart } from 'lucide-react';
import { Event } from '../data/mockEvents';
import { useRSVP } from '../contexts/AppContext';
import EventTypeIcon from './EventTypeIcon';
import Card from './ui/Card';
import Badge from './ui/Badge';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { isRSVPed, rsvpToEvent, cancelRSVP } = useRSVP();
  const isRegistered = isRSVPed(event.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRSVP = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRegistered) {
      cancelRSVP(event.id);
    } else {
      rsvpToEvent(event.id);
    }
  };

  return (
    <Link to={`/events/${event.id}`} className="block group">
      <Card hover className="overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <EventTypeIcon type={event.type} />
            <button
              onClick={handleRSVP}
              className={`p-2 rounded-full transition-all duration-200 ${
                isRegistered 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-red-100 hover:text-red-600'
              }`}
              aria-label={isRegistered ? 'Cancel RSVP' : 'RSVP to event'}
            >
              <Heart className={`h-4 w-4 ${isRegistered ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {event.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User className="h-4 w-4 mr-2 text-orange-600" />
              {event.host}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge variant="primary" size="sm">
              {event.type}
            </Badge>
            {isRegistered && (
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                ✓ Registered
              </span>
            )}
          </div>
      </Card>
    </Link>
  );
}