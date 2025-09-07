import React from 'react';
import { 
  Music, 
  Dumbbell, 
  Users, 
  Briefcase, 
  Smile, 
  Trophy, 
  Heart 
} from 'lucide-react';

interface EventTypeIconProps {
  type: string;
  className?: string;
}

const iconMap = {
  Music: Music,
  Fitness: Dumbbell,
  Meetup: Users,
  Workshop: Briefcase,
  Entertainment: Smile,
  Sports: Trophy,
  Social: Heart
};

const colorMap = {
  Music: 'text-purple-600 bg-purple-100',
  Fitness: 'text-green-600 bg-green-100',
  Meetup: 'text-blue-600 bg-blue-100',
  Workshop: 'text-orange-600 bg-orange-100',
  Entertainment: 'text-pink-600 bg-pink-100',
  Sports: 'text-red-600 bg-red-100',
  Social: 'text-indigo-600 bg-indigo-100'
};

export default function EventTypeIcon({ type, className = 'h-5 w-5' }: EventTypeIconProps) {
  const IconComponent = iconMap[type as keyof typeof iconMap] || Users;
  const colors = colorMap[type as keyof typeof colorMap] || 'text-gray-600 bg-gray-100';

  return (
    <div className={`p-2 rounded-full ${colors}`}>
      <IconComponent className={className} />
    </div>
  );
}