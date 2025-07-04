import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import eclipse from '../assets/eclipse.jpg';
import Huddle from '../assets/Huddle.jpg';
import jsx from '../assets/jsxarena.jpg';

const turfs = [
  {
    name: "The Eclipse Sports-2",
    location: "New Alkapuri",
    image: eclipse,
    link: "http://theeclipsesports.in/",
  },
  {
    name: "Huddle Sports Arena",
    location: "Subhanpura",
    image: Huddle,
    link: "https://example.com/greenzone",
  },
  {
    name: "Delta 9 Sports Park",
    location: "Gorwa",
    image: jsx,
    link: "https://example.com/kickoff",
  },
];

export default function TurfList() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-zinc-900 text-white px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-green-400 text-center mb-12">Available Turfs</h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {turfs.map((turf, index) => (
          <motion.a
            href={turf.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden transition hover:shadow-green-500/40"
          >
            <img src={turf.image} alt={turf.name} className="h-56 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-white">{turf.name}</h2>
              <p className="text-sm text-gray-400">{turf.location}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
