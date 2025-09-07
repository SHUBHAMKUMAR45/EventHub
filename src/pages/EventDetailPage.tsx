import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowLeft, Heart, Share2, Clock } from 'lucide-react';
import { Event } from '../data/mockEvents';
import { eventService } from '../services/eventService';
import { useRSVP } from '../contexts/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EventTypeIcon from '../components/EventTypeIcon';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpAction, setRSVPAction] = useState<'join' | 'cancel'>('join');
  
  const { isRSVPed, rsvpToEvent, cancelRSVP } = useRSVP();

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) {
        setError('Event ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await eventService.getEventById(parseInt(id));
        if (eventData) {
          setEvent(eventData);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Failed to load event details');
        console.error('Error loading event:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      short: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
  };

  const isEventPast = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const handleRSVPClick = () => {
    if (!event) return;
    
    const isRegistered = isRSVPed(event.id);
    setRSVPAction(isRegistered ? 'cancel' : 'join');
    setShowRSVPModal(true);
  };

  const handleRSVPConfirm = () => {
    if (!event) return;

    if (rsvpAction === 'join') {
      rsvpToEvent(event.id);
    } else {
      cancelRSVP(event.id);
    }
    
    setShowRSVPModal(false);
  };

  const handleShare = async () => {
    if (!event) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {error || 'Event not found'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const isRegistered = isRSVPed(event.id);
  const isPastEvent = isEventPast(event.date);
  const formattedDate = formatDate(event.date);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          icon={ArrowLeft}
          className="mb-6"
        >
          Back to Events
        </Button>

        {/* Event Header */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <EventTypeIcon type={event.type} />
                <Badge variant="primary">{event.type}</Badge>
                {isRegistered && (
                  <Badge variant="success">✓ Registered</Badge>
                )}
                {isPastEvent && (
                  <Badge variant="secondary">Past Event</Badge>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formattedDate.short}
                    </p>
                    <p className="text-sm">{formattedDate.full}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {event.location}
                    </p>
                    <p className="text-sm">Event Location</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="h-5 w-5 mr-3 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {event.host}
                    </p>
                    <p className="text-sm">Event Host</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
              {!isPastEvent && (
                <Button
                  variant={isRegistered ? "outline" : "primary"}
                  onClick={handleRSVPClick}
                  icon={Heart}
                  fullWidth
                  className={isRegistered ? "text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900" : ""}
                >
                  {isRegistered ? 'Cancel RSVP' : 'Join Event'}
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={handleShare}
                icon={Share2}
                fullWidth
              >
                Share Event
              </Button>
            </div>
          </div>
        </Card>

        {/* Event Description */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            About This Event
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {event.description}
            </p>
          </div>

          {isPastEvent && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This event has already taken place. Check out other upcoming events!
              </p>
            </div>
          )}
        </Card>

        {/* RSVP Confirmation Modal */}
        <Modal
          isOpen={showRSVPModal}
          onClose={() => setShowRSVPModal(false)}
          title={rsvpAction === 'join' ? 'Join Event' : 'Cancel RSVP'}
          size="md"
        >
          <div className="text-center">
            <div className={`rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
              rsvpAction === 'join' 
                ? 'bg-blue-100 dark:bg-blue-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              <Heart className={`h-8 w-8 ${
                rsvpAction === 'join' 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-red-600 dark:text-red-400'
              }`} />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {rsvpAction === 'join' 
                ? 'Join this event?' 
                : 'Cancel your RSVP?'
              }
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {rsvpAction === 'join' 
                ? 'You\'ll be registered for this event and can view it in your "My Events" section.'
                : 'You\'ll no longer be registered for this event and it will be removed from your "My Events" section.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant={rsvpAction === 'join' ? 'primary' : 'danger'}
                onClick={handleRSVPConfirm}
                fullWidth
              >
                {rsvpAction === 'join' ? 'Yes, Join Event' : 'Yes, Cancel RSVP'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRSVPModal(false)}
                fullWidth
              >
                Keep Current Status
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}