import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, Type, FileText, Tag } from 'lucide-react';
import { eventService, CreateEventData } from '../services/eventService';
import { eventTypes } from '../data/mockEvents';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

interface FormData extends CreateEventData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: '',
    date: '',
    location: '',
    host: '',
    description: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.type) {
      newErrors.type = 'Event type is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.host.trim()) {
      newErrors.host = 'Host name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const newEvent = await eventService.createEvent(formData);
      setCreatedEventId(newEvent.id);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to create event:', error);
      setErrors({ submit: 'Failed to create event. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleViewEvent = () => {
    if (createdEventId) {
      navigate(`/events/${createdEventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Create New Event
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Share your event with the community and bring people together
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <Input
              label="Event Title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a compelling event title..."
              icon={Type}
              error={errors.title}
              required
            />

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Event Type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                options={[
                  { value: '', label: 'Select event type' },
                  ...eventTypes.map(type => ({ value: type, label: type }))
                ]}
                error={errors.type}
                required
              />

              <Input
                label="Event Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                icon={Calendar}
                error={errors.date}
                required
              />
            </div>

            {/* Location and Host */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City or venue name"
                icon={MapPin}
                error={errors.location}
                required
              />

              <Input
                label="Host Name"
                type="text"
                value={formData.host}
                onChange={(e) => handleInputChange('host', e.target.value)}
                placeholder="Your name or organization"
                icon={User}
                error={errors.host}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Description *
              </label>
              <div className="relative">
                <FileText className="h-4 w-4 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your event in detail. What can attendees expect?"
                  rows={4}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                    errors.description ? 'border-red-500 dark:border-red-400' : ''
                  }`}
                  required
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                fullWidth
                className="sm:flex-1"
              >
                Create Event
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                fullWidth
                className="sm:flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Success Modal */}
        <Modal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          title="Event Created Successfully!"
          size="md"
        >
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Your event has been created!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your event is now live and visible to the community. People can start discovering and joining your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={handleViewEvent}
                fullWidth
              >
                View Event
              </Button>
              <Button
                variant="outline"
                onClick={handleSuccessModalClose}
                fullWidth
              >
                Back to Events
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}