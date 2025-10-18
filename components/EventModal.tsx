
import React from 'react';
import { motion } from 'framer-motion';
import { SpaceEvent } from '../types';
import { XIcon } from './Icons';

interface EventModalProps {
  event: SpaceEvent;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
};

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const localDate = new Date(event.date).toLocaleString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl bg-gradient-to-br from-space-light to-space-dark border border-slate-700 rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <XIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-slate-100 mb-2">{event.name}</h2>
        <p className="text-sm text-space-blue font-semibold mb-4">{event.eventType}</p>

        {event.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-auto object-cover" />
          </div>
        )}
        
        <div className="space-y-4 text-slate-300">
          <div>
            <h4 className="font-semibold text-slate-100">Date & Time</h4>
            <p>{localDate}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Status: <span className="font-normal">{event.status.abbrev}</span></h4>
            <p className="text-sm text-slate-400">{event.status.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Launch Site</h4>
            <p>{event.location}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Agency</h4>
            <p>{event.agency}</p>
          </div>
           <div>
            <h4 className="font-semibold text-slate-100">Vehicle</h4>
            <p>{event.rocket}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100">Mission Description</h4>
            <p className="text-slate-400 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
