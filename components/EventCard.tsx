
import React from 'react';
import { motion } from 'framer-motion';
import { SpaceEvent, EventType } from '../types';
import Countdown from './Countdown';
import { RocketIcon, SatelliteIcon, StarIcon, SparklesIcon } from './Icons';

interface EventCardProps {
  event: SpaceEvent;
  onSelect: (event: SpaceEvent) => void;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'go':
      return 'text-green-400 border-green-400';
    case 'tbc':
    case 'tbd':
      return 'text-yellow-400 border-yellow-400';
    case 'delayed':
      return 'text-orange-400 border-orange-400';
    default:
      return 'text-slate-400 border-slate-400';
  }
};

const EventIcon: React.FC<{ type: EventType }> = ({ type }) => {
  const iconProps = { className: "w-5 h-5 text-space-blue" };
  switch (type) {
    case EventType.Launch:
      return <RocketIcon {...iconProps} />;
    case EventType.ISSPass:
      return <SatelliteIcon {...iconProps} />;
    case EventType.MeteorShower:
      return <StarIcon {...iconProps} />;
    case EventType.SatelliteDeployment:
      return <SparklesIcon {...iconProps} />;
    default:
      return <RocketIcon {...iconProps} />;
  }
};

const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const localDate = new Date(event.date).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 15px -3px rgba(56, 189, 248, 0.1), 0 4px 6px -2px rgba(56, 189, 248, 0.05)" }}
      className="bg-space-light/50 backdrop-blur-md border border-slate-700 rounded-2xl p-5 cursor-pointer flex flex-col justify-between overflow-hidden relative"
      onClick={() => onSelect(event)}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
            <EventIcon type={event.eventType} />
            <span className={`text-xs font-semibold px-2 py-1 border rounded-full ${getStatusColor(event.status.abbrev)}`}>
                {event.status.abbrev}
            </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 leading-tight flex-grow">{event.name}</h3>
        
        <div className="text-sm text-slate-400 space-y-2 mb-4">
          <p><strong>Date:</strong> {localDate}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700">
          <Countdown targetDate={event.date} />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
