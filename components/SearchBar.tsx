
import React from 'react';
import { EventType } from '../types';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: EventType | 'all';
  setSelectedType: (type: EventType | 'all') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search by event name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-700 rounded-md py-2 px-4 focus:ring-2 focus:ring-space-blue focus:border-space-blue outline-none transition-all duration-200"
        />
      </div>
      <div className="relative">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as EventType | 'all')}
          className="w-full md:w-auto appearance-none bg-slate-900/80 border border-slate-700 rounded-md py-2 px-4 pr-8 focus:ring-2 focus:ring-space-blue focus:border-space-blue outline-none transition-all duration-200"
        >
          <option value="all">All Event Types</option>
          {Object.values(EventType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
