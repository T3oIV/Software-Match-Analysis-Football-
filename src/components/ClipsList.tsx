import React, { useState } from 'react';
import { useStore } from '../store';
import { Pencil, Save, Trash2 } from 'lucide-react';

export function ClipsList() {
  const { clips } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEditNote = (clipId: string, currentNote: string) => {
    setEditingId(clipId);
    setEditNote(currentNote);
  };

  const handleSaveNote = (clipId: string) => {
    // In a real app, you'd update the store here
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Recorded Clips</h3>
      <div className="space-y-3">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className={`p-3 rounded-lg ${
              clip.category === 'attack' ? 'bg-blue-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{clip.actionType}</span>
              <span className="text-sm text-gray-600">
                {formatTime(clip.startTime)} - {formatTime(clip.endTime)}
              </span>
            </div>
            
            {editingId === clip.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                  placeholder="Add notes..."
                />
                <button
                  onClick={() => handleSaveNote(clip.id)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {clip.notes || 'No notes'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditNote(clip.id, clip.notes)}
                    className="p-1 text-gray-600 hover:text-gray-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}