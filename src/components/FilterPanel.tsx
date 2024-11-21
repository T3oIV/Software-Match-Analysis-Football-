import React from 'react';
import { useAnalysisStore } from '../store';
import { EventType } from '../types';

const EVENT_TYPES: { type: EventType; label: string }[] = [
  { type: 'assist', label: 'Assists' },
  { type: 'cross', label: 'Crosses' },
  { type: 'shot', label: 'Shots' },
  { type: 'shot_on_target', label: 'Shots on Target' },
  { type: 'goal', label: 'Goals' },
  { type: 'dribble', label: 'Dribbles' },
  { type: 'foul', label: 'Fouls' },
  { type: 'free_kick', label: 'Free Kicks' },
  { type: 'duel_won', label: 'Duels Won' },
  { type: 'ball_recovery', label: 'Ball Recoveries' },
  { type: 'ball_lost', label: 'Ball Lost' },
  { type: 'gk_save', label: 'GK Saves' }
];

export function FilterPanel() {
  const { selectedEventTypes, selectedTeam, setSelectedEventTypes, setSelectedTeam } = useAnalysisStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Home Team Formation */}
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-600">Home Team</h3>
          {/* Add formation display */}
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setSelectedTeam('home')}
              className={`px-3 py-1 rounded ${
                selectedTeam === 'home' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setSelectedTeam('both')}
              className={`px-3 py-1 rounded ${
                selectedTeam === 'both' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setSelectedTeam('away')}
              className={`px-3 py-1 rounded ${
                selectedTeam === 'away' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Away
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {EVENT_TYPES.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => {
                  if (selectedEventTypes.includes(type)) {
                    setSelectedEventTypes(selectedEventTypes.filter(t => t !== type));
                  } else {
                    setSelectedEventTypes([...selectedEventTypes, type]);
                  }
                }}
                className={`px-2 py-1 text-sm rounded ${
                  selectedEventTypes.includes(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Away Team Formation */}
        <div className="space-y-2">
          <h3 className="font-semibold text-red-600">Away Team</h3>
          {/* Add formation display */}
        </div>
      </div>
    </div>
  );
}