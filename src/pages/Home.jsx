import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import turfBg from '../assets/turf-bg.png';

function Home() {
  return (
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* FULL background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.4] z-0"
        style={{ backgroundImage: `url(${turfBg})` }}
      ></div>

      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/60 z-0"></div>

      {/* Content in center */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Feel the Turf.
          <br />
          Play under the Lights.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mt-6 text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover and book turf grounds near you. Maintained by <span className="text-green-400 font-semibold">Grassy</span>.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            to="/turfs"
            className="px-8 py-4 text-lg rounded-full font-bold text-white bg-green-600 hover:bg-green-500 transition shadow-xl shadow-green-800/30 hover:shadow-green-750/50 hover:scale-102 inline-block"
          >
            Book a Turf Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Home;
