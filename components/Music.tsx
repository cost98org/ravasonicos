'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

export default function Music() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      title: 'Creep',
      audioUrl: '/audio/track1.ogg',
      cover: '/images/logo_senza_sfondo.webp',
    },
    {
      title: 'Laura no está',
      audioUrl: '/audio/track2.ogg',
      cover: '/images/logo_senza_sfondo.webp',
    },
    {
      title: 'Maldito duende',
      audioUrl: '/audio/track3.ogg',
      cover: '/images/logo_senza_sfondo.webp',
    },
  ];

  const handlePlayPause = (index: number) => {
    if (playing === index) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(tracks[index].audioUrl);
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.play();
      setPlaying(index);
      audioRef.current.onended = () => {
        setPlaying(null);
        setCurrentTime(0);
      };
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <section id="music" className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-grain opacity-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-4 text-secondary drop-shadow-[0_0_20px_rgba(255,235,59,0.3)]">
            ASCOLTA
          </h2>
          <p className="text-center text-white/70 mb-12 text-lg max-w-3xl mx-auto">
            Il nostro sound che fonde rock e ritmi latini
          </p>

          {/* Music Players */}
          <div className="space-y-4 mb-16">
            {tracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`relative bg-gradient-to-r from-primary/5 via-secondary/5 to-cta/5 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                  playing === index 
                    ? 'border-neon shadow-neon' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-4">
                      
                      {/* Album Cover */}
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-black/30">
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          className="object-cover"
                          quality={70}
                          sizes="64px"
                        />
                      </div>

                      {/* Play/Pause Button */}
                      <button
                        onClick={() => handlePlayPause(index)}
                        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                          playing === index
                            ? 'bg-primary text-white shadow-[0_0_20px_rgba(255,0,255,0.5)]'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {playing === index ? (
                          <FaPause size={18} />
                        ) : (
                          <FaPlay size={18} className="ml-0.5" />
                        )}
                      </button>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg mb-1">{track.title}</h3>
                        <div className="text-sm text-white/60 space-y-1">
                          <div>Ravasonicos</div>
                          <div className="flex items-center gap-2 font-mono">
                            <span>
                              {playing === index ? formatTime(currentTime) : '0:00'}
                            </span>
                            <span>•</span>
                            <span>
                              {playing === index && duration ? formatTime(duration) : '--:--'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Waveform Visualizer - Always visible */}
                    <div className="relative h-20 bg-black/50 rounded-lg p-4 mb-3">
                      <div className="flex items-center justify-center gap-1 h-full">
                        {[...Array(50)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-1 rounded-full transition-colors duration-300 ${
                              playing === index 
                                ? 'bg-neon shadow-[0_0_4px_rgba(255,0,255,0.8)]' 
                                : 'bg-white/40'
                            }`}
                            animate={playing === index ? {
                              height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`],
                            } : {
                              height: '30%'
                            }}
                            transition={{
                              duration: 0.3 + Math.random() * 0.3,
                              repeat: playing === index ? Infinity : 0,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={playing === index ? currentTime : 0}
                      onChange={handleSeek}
                      disabled={playing !== index}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-3
                        [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-primary
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:hover:scale-125
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,0,255,0.5)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: playing === index && duration > 0
                          ? `linear-gradient(to right, #ff00ff ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%)`
                          : 'rgba(255,255,255,0.1)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Streaming Platforms */}
          <motion.div
            className="bg-gradient-to-r from-primary/10 via-secondary/10 to-cta/10 border-2 border-primary/30 rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Seguici su YouTube
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Scopri i nostri video, live performance e molto altro
            </p>
            <div className="flex justify-center">
              <a
                href="https://m.youtube.com/channel/UC-HcJTcyJpeq0GtZqSeN6rw"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 bg-black border-2 border-neon text-neon font-bold rounded-lg transition-all duration-300 transform hover:bg-neon hover:text-black hover:scale-105 shadow-lg shadow-neon/30"
              >
                <FaYoutube className="text-2xl" />
                <span>Visita il canale YouTube</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
