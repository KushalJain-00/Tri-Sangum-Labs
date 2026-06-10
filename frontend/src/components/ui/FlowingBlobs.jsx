import React from 'react';

export default function FlowingBlobs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Container for blobs, allowing specific placement relative to the parent */}
      <div className="absolute inset-0 w-full h-full">
        {/* Blue Blob */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-logo-blue/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        
        {/* Orange/Terracotta Blob */}
        <div className="absolute top-[20%] -right-[10%] w-[70%] h-[70%] bg-logo-orange/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Secondary Blue Blob for blending */}
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-blue-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Subtle grain overlay to give it a watercolor/textured feel like the logo */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
