import React, { useRef, useEffect } from 'react';
import { useAnalysisStore } from '../store';
import { Play, Pause, FastForward, Rewind } from 'lucide-react';

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videoTime, setVideoTime } = useAnalysisStore();

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        controls
      />
      <div className="p-2 flex items-center space-x-2">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && videoRef.current) {
              videoRef.current.src = URL.createObjectURL(file);
            }
          }}
        />
      </div>
    </div>
  );
}