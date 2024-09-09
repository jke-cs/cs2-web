import React from 'react';
import Image from 'next/image';

interface GiveawayProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Giveaway({ activeSection, setActiveSection }: GiveawayProps) {
  return (
    <div className="giveaway-container flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-4 animate-pulse">🎉 Win 50€ 🎉</h1>
      <p className="text-xl mb-6 text-center">
        Starting <strong>October 1st, 2024</strong>, the player with the most GlobalPoints
        collected in one month will win <span className="font-bold">50€</span>! 🏆
      </p>
      <ul className="list-disc list-inside text-lg mb-6 text-center">
        <li>1st Place: <span className="font-bold">50€ via Steam</span></li>
        <div className="flex justify-center my-4 relative">
          <div className="bg-[#11141c] bg-opacity-80 rounded-lg p-4 relative">
            <Image 
              src="/m4a1s_blacklotus.svg" 
              alt="M4A1-S Black Lotus" 
              width={150} 
              height={150} 
            />
            <span className="absolute top-0 right-0 flex items-center justify-center p-2">
              <span className="absolute inline-flex h-4 w-4 rounded-full bg-yellow-500 opacity-50 animate-ping"></span>
            </span>
          </div>
        </div>
        <li>2nd Place: <span className="font-bold">M4A1-S Black Lotus</span></li>
        <div className="flex justify-center my-4 relative">
          <div className="bg-[#11141c] bg-opacity-80 rounded-lg p-4 relative">
            <Image 
              src="/awp_exoskeleton.svg" 
              alt="AWP Exoskeleton" 
              width={150} 
              height={150} 
            />
            <span className="absolute top-0 right-0 flex items-center justify-center p-2">
              <span className="absolute inline-flex h-4 w-4 rounded-full bg-yellow-500 opacity-50 animate-ping"></span>
            </span>
          </div>
        </div>
        <li>3rd Place: <span className="font-bold">StatTrak™ AWP Exoskeleton</span></li>
      </ul>
      <p className="text-center mb-6">
        Get grinding and collect as many GlobalPoints as you can before the end of the month!
      </p>
      <button
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold text-lg transition-all duration-300"
        onClick={() => setActiveSection('globalPoints')}
      >
        Learn How to Earn GlobalPoints
      </button>
    </div>
  );
}
