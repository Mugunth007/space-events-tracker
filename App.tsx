
import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEvents } from './hooks/useEvents';
import { SpaceEvent, EventType } from './types';
import SearchBar from './components/SearchBar';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import { RocketIcon } from './components/Icons';

const App: React.FC = () => {
  const { events, loading, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesType = selectedType === 'all' || event.eventType === selectedType;
        const matchesSearch =
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
      });
  }, [events, searchTerm, selectedType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-slate-900 to-black text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-8 md:mb-12">
           <div className="flex justify-center items-center gap-4 mb-2">
             <RocketIcon className="w-10 h-10 text-space-blue" />
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-space-blue to-space-purple">
                Space Events Tracker
             </h1>
           </div>
          <p className="text-slate-400 text-lg">Your portal to the cosmos. Track upcoming launches and celestial events.</p>
        </header>

        <main>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-blue"></div>
            </div>
          )}
          {error && <p className="text-center text-red-400 mt-8">{error}</p>}
          
          {!loading && !error && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
              ))}
            </motion.div>
          )}
          {filteredEvents.length === 0 && !loading && <p className="text-center text-slate-400 mt-8">No events found matching your criteria.</p>}
        </main>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
