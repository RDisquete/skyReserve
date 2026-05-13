import { useState, useRef } from 'react';

interface HoverVideoImageProps {
  imageSrc: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  videoClassName?: string;
}

export const HoverVideoImage = ({
  imageSrc,
  videoSrc,
  alt,
  className = '',
  imageClassName = '',
  videoClassName = '',
}: HoverVideoImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (!videoSrc) return;
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!videoSrc) return;
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={imageSrc} 
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'} ${imageClassName}`}
      />
      
      {videoSrc && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} ${videoClassName}`}
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
};