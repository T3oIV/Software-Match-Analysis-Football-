import { create } from 'zustand';
import { Event, EventType, ZoneStats } from './types';

interface AnalysisStore {
  events: Event[];
  selectedEvents: Event[];
  timeRange: [number, number];
  selectedZone: number | null;
  selectedEventTypes: EventType[];
  selectedTeam: 'home' | 'away' | 'both';
  zoneStats: ZoneStats[];
  videoTime: number;
  
  addEvent: (event: Event) => void;
  setTimeRange: (range: [number, number]) => void;
  setSelectedZone: (zone: number | null) => void;
  setSelectedEventTypes: (types: EventType[]) => void;
  setSelectedTeam: (team: 'home' | 'away' | 'both') => void;
  setVideoTime: (time: number) => void;
  exportPlaylist: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  events: [],
  selectedEvents: [],
  timeRange: [0, 90],
  selectedZone: null,
  selectedEventTypes: [],
  selectedTeam: 'both',
  zoneStats: [],
  videoTime: 0,

  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  
  setTimeRange: (range) => set({ timeRange: range }),
  
  setSelectedZone: (zone) => set({ selectedZone: zone }),
  
  setSelectedEventTypes: (types) => set({ selectedEventTypes: types }),
  
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  
  setVideoTime: (time) => set({ videoTime: time }),
  
  exportPlaylist: () => {
    const { selectedEvents } = get();
    // Implementation for exporting selected events as a playlist
    const playlist = selectedEvents.map(event => ({
      timestamp: event.timestamp,
      type: event.type,
      player: event.player,
      description: event.description
    }));
    
    const blob = new Blob([JSON.stringify(playlist, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis-playlist.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}));