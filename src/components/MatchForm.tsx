import React, { useState } from 'react';
import { useStore } from '../store';
import { Trophy, Users, Calendar } from 'lucide-react';
import { teams, competitions, formations } from '../data/teams';

export function MatchForm({ onComplete }: { onComplete: () => void }) {
  const setMatchInfo = useStore((state) => state.setMatchInfo);
  const [selectedLeague, setSelectedLeague] = useState<string>('Premier League');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMatchInfo({
      homeTeam: formData.get('homeTeam') as string,
      awayTeam: formData.get('awayTeam') as string,
      date: formData.get('date') as string,
      competition: formData.get('competition') as string,
      homeFormation: formData.get('homeFormation') as string,
      awayFormation: formData.get('awayFormation') as string,
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Match Analysis Setup</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* League Selection */}
          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Trophy className="w-4 h-4 mr-2" />
              League
            </label>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(teams).map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>

          {/* Home Team */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              Home Team
            </label>
            <select
              required
              name="homeTeam"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Home Team</option>
              {teams[selectedLeague].map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          
          {/* Away Team */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              Away Team
            </label>
            <select
              required
              name="awayTeam"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Away Team</option>
              {teams[selectedLeague].map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              Date
            </label>
            <input
              required
              type="date"
              name="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Competition */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Trophy className="w-4 h-4 mr-2" />
              Competition
            </label>
            <select
              required
              name="competition"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Competition</option>
              {competitions.map((competition) => (
                <option key={competition} value={competition}>
                  {competition}
                </option>
              ))}
            </select>
          </div>

          {/* Home Formation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Home Formation</label>
            <select
              required
              name="homeFormation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Formation</option>
              {formations.map((formation) => (
                <option key={formation} value={formation}>
                  {formation}
                </option>
              ))}
            </select>
          </div>

          {/* Away Formation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Away Formation</label>
            <select
              required
              name="awayFormation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Formation</option>
              {formations.map((formation) => (
                <option key={formation} value={formation}>
                  {formation}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Analysis
        </button>
      </form>
    </div>
  );
}