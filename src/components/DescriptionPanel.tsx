import React from 'react';
import { useAnalysisStore } from '../store';
import { Download } from 'lucide-react';

export function DescriptionPanel() {
  const { selectedEvents, exportPlaylist } = useAnalysisStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Selected Events</h3>
        <button
          onClick={exportPlaylist}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Export Playlist</span>
        </button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {selectedEvents.map(event => (
          <div
            key={event.id}
            className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{event.player.name}</span>
              <span className="text-gray-600 ml-2">({event.type})</span>
            </div>
            <span className="text-sm text-gray-500">
              {Math.floor(event.timestamp / 60)}:{String(Math.floor(event.timestamp % 60)).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}