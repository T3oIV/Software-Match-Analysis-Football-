import React, { useState } from 'react';
import { useStore } from '../store';

const ACTIONS = {
  attack: ['Build-up', 'Final Third', 'Wing Play', 'Counter Attack', 'Set Piece'],
  defense: ['First Press', 'Defensive Line', 'Recovery', 'Transition', 'Set Piece Defense']
};

export function TaggingPanel() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const { videoState, addClip } = useStore();

  const handleTagClick = (action: string, category: 'attack' | 'defense') => {
    if (activeTag === action) {
      // Stop recording
      addClip({
        id: Date.now().toString(),
        startTime: recordingStartTime!,
        endTime: videoState.currentTime,
        actionType: action,
        category,
        notes: '',
      });
      setActiveTag(null);
      setRecordingStartTime(null);
    } else {
      // Start recording
      setActiveTag(action);
      setRecordingStartTime(videoState.currentTime);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-600">Attack</h3>
        <div className="grid grid-cols-2 gap-2">
          {ACTIONS.attack.map((action) => (
            <button
              key={action}
              onClick={() => handleTagClick(action, 'attack')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTag === action
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-red-600">Defense</h3>
        <div className="grid grid-cols-2 gap-2">
          {ACTIONS.defense.map((action) => (
            <button
              key={action}
              onClick={() => handleTagClick(action, 'defense')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTag === action
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}