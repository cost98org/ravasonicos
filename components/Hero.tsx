'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Sfondo immagine */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/images/sfondo.webp"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Animated light beams */}
      <div className="absolute inset-0">
        {[15, 35, 55, 75, 85].map((pos, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute w-32 h-full origin-top"
            style={{
              left: `${pos}%`,
              top: '0',
              background: `linear-gradient(to bottom, rgba(255, 47, 142, ${0.15 + i * 0.05}) 0%, transparent 70%)`,
              clipPath: 'polygon(45% 0%, 55% 0%, 60% 100%, 40% 100%)',
              filter: 'blur(8px)',
            }}
            animate={{
              rotateZ: [0, 4, -4, 0],
              opacity: [0.3, 0.7, 0.3],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating light particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${30 + Math.random() * 70}%`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              background: i % 2 === 0 ? '#FF2F8E' : '#FFB6D9',
              boxShadow: `0 0 ${10 + Math.random() * 20}px ${i % 2 === 0 ? 'rgba(255, 47, 142, 0.6)' : 'rgba(255, 182, 217, 0.6)'}`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -100 - Math.random() * 150, 0],
              x: [-20 + Math.random() * 40, 20 - Math.random() * 40, -20 + Math.random() * 40],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 md:pt-0">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/images/logo_senza_sfondo.webp"
            alt="Jubimm y Los Ravasónicos Logo"
            width={500}
            height={170}
            className="mx-auto drop-shadow-[0_0_40px_rgba(0,255,136,0.3)] brightness-110"
            priority
            quality={90}
            sizes="(max-width: 768px) 90vw, 500px"
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="mailto:ravasonicos@gmail.com?subject=Info%20merchandising"
            className="group bg-neon hover:bg-neon/90 text-dark font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-neon hover:shadow-neon-lg flex items-center gap-3"
          >
            <FaEnvelope className="group-hover:scale-110 transition-transform" size={16} />
            INFO MERCHANDISING
          </a>
          <button
            onClick={() => document.querySelector('#tour')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-neon bg-transparent hover:bg-neon/10 text-neon font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <FaCalendar size={16} />
            DATE TOUR
          </button>
        </motion.div>
      </div>

    </section>
  );
}
