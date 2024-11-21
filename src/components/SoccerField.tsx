import React from 'react';
import { Stage, Layer, Rect, Line, Circle } from 'react-konva';
import { useAnalysisStore } from '../store';

const FIELD_WIDTH = 600;
const FIELD_HEIGHT = 400;
const ZONES = 12; // 4x3 grid

export function SoccerField() {
  const { events, selectedEventTypes, selectedTeam, selectedZone, timeRange } = useAnalysisStore();

  const drawField = () => {
    return (
      <>
        {/* Field outline */}
        <Rect
          x={0}
          y={0}
          width={FIELD_WIDTH}
          height={FIELD_HEIGHT}
          stroke="white"
          fill="#2c8c3c"
        />
        
        {/* Center circle */}
        <Circle
          x={FIELD_WIDTH / 2}
          y={FIELD_HEIGHT / 2}
          radius={50}
          stroke="white"
        />
        
        {/* Center line */}
        <Line
          points={[FIELD_WIDTH / 2, 0, FIELD_WIDTH / 2, FIELD_HEIGHT]}
          stroke="white"
        />
        
        {/* Penalty areas */}
        <Rect
          x={0}
          y={(FIELD_HEIGHT - 150) / 2}
          width={100}
          height={150}
          stroke="white"
        />
        <Rect
          x={FIELD_WIDTH - 100}
          y={(FIELD_HEIGHT - 150) / 2}
          width={100}
          height={150}
          stroke="white"
        />
      </>
    );
  };

  const drawZones = () => {
    const zoneWidth = FIELD_WIDTH / 4;
    const zoneHeight = FIELD_HEIGHT / 3;
    
    return Array(ZONES).fill(0).map((_, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      
      return (
        <Rect
          key={index}
          x={col * zoneWidth}
          y={row * zoneHeight}
          width={zoneWidth}
          height={zoneHeight}
          stroke="rgba(255,255,255,0.3)"
          fill={selectedZone === index ? "rgba(255,255,255,0.2)" : undefined}
          onClick={() => useAnalysisStore.getState().setSelectedZone(index)}
        />
      );
    });
  };

  const drawEvents = () => {
    return events
      .filter(event => {
        const inTimeRange = event.timestamp >= timeRange[0] && event.timestamp <= timeRange[1];
        const matchesTeam = selectedTeam === 'both' || event.team === selectedTeam;
        const matchesType = selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type);
        return inTimeRange && matchesTeam && matchesType;
      })
      .map(event => (
        <Circle
          key={event.id}
          x={event.coordinates.x * FIELD_WIDTH}
          y={event.coordinates.y * FIELD_HEIGHT}
          radius={5}
          fill={event.team === 'home' ? '#ff4444' : '#4444ff'}
          onClick={() => {
            // Jump to event time in video
            useAnalysisStore.getState().setVideoTime(event.timestamp);
          }}
        />
      ));
  };

  return (
    <Stage width={FIELD_WIDTH} height={FIELD_HEIGHT}>
      <Layer>
        {drawField()}
        {drawZones()}
        {drawEvents()}
      </Layer>
    </Stage>
  );
}