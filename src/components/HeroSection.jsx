import React, { useEffect, useRef, useState } from 'react';
import InvestorProfiles from './InvestorProfiles';
import StatsCard from './StatsCard';

const HeroSection = () => {
  // const videoIds = ['2sV9N-VllGg', '89AKzhJCwzY', 'z62D8oirRbI', 'LozCDEhi0I4']; // Replace with your actual video IDs
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const playerRef = useRef(null);

  // useEffect(() => {
  //   // Load YouTube IFrame API
  //   const tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   document.body.appendChild(tag);

  //   // YouTube API callback
  //   window.onYouTubeIframeAPIReady = () => {
  //     playerRef.current = new window.YT.Player('youtube-player', {
  //       videoId: videoIds[currentIndex],
  //       playerVars: {
  //         autoplay: 1,
  //         mute: 1,
  //         controls: 0,
  //         modestbranding: 1,
  //         rel: 0,
  //         showinfo: 0,
  //       },
  //       events: {
  //         onStateChange: onPlayerStateChange,
  //       },
  //     });
  //   };

  //   // const onPlayerStateChange = (event) => {
  //   //   // When video ends
  //   //   if (event.data === window.YT.PlayerState.ENDED) {
  //   //     const nextIndex = (currentIndex + 1) % videoIds.length;
  //   //     setCurrentIndex(nextIndex);
  //   //     playerRef.current.loadVideoById(videoIds[nextIndex]);
  //   //   }
  //   // };

  //   let timeoutId;

  //   const onPlayerStateChange = (event) => {
  //     // If video starts playing
  //     if (event.data === window.YT.PlayerState.PLAYING) {
  //       // Clear any existing timer
  //       clearTimeout(timeoutId);
    
  //       // Skip to next video after 2 minutes
  //       timeoutId = setTimeout(() => {
  //         const nextIndex = (currentIndex + 1) % videoIds.length;
  //         setCurrentIndex(nextIndex);
  //         playerRef.current.loadVideoById(videoIds[nextIndex]);
  //       }, 60 * 1000); // 2 minutes in milliseconds
  //     }
    
  //     // If video is paused or ended early
  //     if (
  //       event.data === window.YT.PlayerState.ENDED ||
  //       event.data === window.YT.PlayerState.PAUSED
  //     ) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [currentIndex]);



  const videoIds = ['2sV9N-VllGg', '89AKzhJCwzY', 'z62D8oirRbI', 'LozCDEhi0I4'];
  const playerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const timerRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const fadeElementRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoIds[currentIndexRef.current],
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => startTimer(),
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        startTimer();
      }
      if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
        clearTimer();
      }
    };

    const startTimer = () => {
      clearTimer();
      timerRef.current = setTimeout(() => {
        triggerFadeTransition();
      }, 1 * 60 * 1000); // 1 minute in milliseconds
    };

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const triggerFadeTransition = () => {
      // Show fade overlay
      if (fadeElementRef.current) {
        fadeElementRef.current.classList.remove('opacity-0');
        fadeElementRef.current.classList.add('opacity-100');
      }

      // After fade completes, switch video
      fadeTimeoutRef.current = setTimeout(() => {
        const nextIndex = (currentIndexRef.current + 1) % videoIds.length;
        currentIndexRef.current = nextIndex;
        playerRef.current.loadVideoById(videoIds[nextIndex]);
        
        // Hide fade overlay
        if (fadeElementRef.current) {
          fadeElementRef.current.classList.remove('opacity-100');
          fadeElementRef.current.classList.add('opacity-0');
        }
      }, 500); // Match this duration to the CSS transition
    };

    // Cleanup
    return () => {
      clearTimer();
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (playerRef.current) playerRef.current.destroy();
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <div
          id="youtube-player"
          className="absolute inset-0 w-full h-full object-cover"
        ></div>
        
        {/* Fade Overlay for Transition */}
        <div 
          ref={fadeElementRef}
          className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none"
        ></div>
        
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-3 gap-16 items-center mt-12">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                WE BRING{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CONTENT CREATORS
                </span>{' '}
                AND{' '}
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  BRANDS
                </span>{' '}
                TOGETHER
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Giving YouTube Creators access to funding and providing Investors with the 
              ability to invest in the Creator Economy
            </p>
            <div className="pt-6">
              <InvestorProfiles />
            </div>
          </div>

          <StatsCard className="w-full" />
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
