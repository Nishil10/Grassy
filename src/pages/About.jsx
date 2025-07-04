import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white py-24 px-6 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-green-400"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        About Grassy
      </motion.h1>

      <motion.p
        className="max-w-3xl text-lg text-gray-300 leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Grassy is built with the goal of transforming how turf grounds are booked.
        We aim to eliminate the hassle of phone calls and WhatsApp messages by providing a clean, centralized booking platform.
        Turf owners can showcase their grounds, while players can easily view slots, book online, and enjoy the game — all in one place.
      </motion.p>
    </motion.div>
  );
}
