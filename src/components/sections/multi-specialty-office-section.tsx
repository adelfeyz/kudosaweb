'use client';

import { useEffect, useRef } from 'react';
import { ImageBox } from '../kit';

const MultiSpecialtyOfficeSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play the video when it's ready
    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.log('Autoplay prevented, user interaction required:', error);
      });
    };

    const handleLoadedData = () => {
      // Video data loaded, try to play
      video.play().catch((error) => {
        console.log('Video play failed:', error);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <ImageBox
      header='Our Multi-Specialty Office'
      image={(
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover z-[1]"
          controls
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          src="/videos/IntrodutionToPointer.mp4"
        >
          <source
            src="/videos/IntrodutionToPointer.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
    />
  )
};

export default MultiSpecialtyOfficeSection;