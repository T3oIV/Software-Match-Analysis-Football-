import React from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { SoccerField } from './components/SoccerField';
import { FilterPanel } from './components/FilterPanel';
import { DescriptionPanel } from './components/DescriptionPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <VideoPlayer />
            <SoccerField />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <FilterPanel />
            <DescriptionPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;