export interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
}

export interface Event {
  id: string;
  type: EventType;
  timestamp: number;
  player: Player;
  team: 'home' | 'away';
  coordinates: { x: number; y: number };
  description?: string;
}

export type EventType =
  | 'assist'
  | 'cross'
  | 'shot'
  | 'shot_on_target'
  | 'goal'
  | 'dribble'
  | 'foul'
  | 'free_kick'
  | 'duel_won'
  | 'ball_recovery'
  | 'ball_lost'
  | 'gk_save';

export interface ZoneStats {
  zone: number;
  events: Record<EventType, number>;
  totalEvents: number;
}