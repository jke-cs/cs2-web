import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCopy, FaPlay, FaDiscord, FaSteam, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Server {
  name: string;
  description: string;
  map: string;
  ip: string;
  image: string;
  connect: string
  type: 'surf' | 'arena' | 'dm' | 'kz';
}

const servers: Server[] = [
  {
    name: "CS2 SURF #1",
    description: "Surf Utopia",
    map: "surf_utopia",
    ip: "play.cs2surf.pro:27015",
    image: "/surf_utopia.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27015"
  },
  {
    name: "CS2 SURF #2",
    description: "Surf Nyx",
    map: "surf_nyx",
    ip: "play.cs2surf.pro:27017",
    image: "/surf_nyx.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27017"
  },
  {
    name: "CS2 SURF #3",
    description: "Surf Me",
    map: "surf_me",
    ip: "play.cs2surf.pro:27018",
    image: "/surf_me.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27018"
  },
  {
    name: "CS2 SURF #4",
    description: "Surf Rookie",
    map: "surf_rookie",
    ip: "play.cs2surf.pro:27019",
    image: "/surf_rookie.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27019"
  },
  {
    name: "CS2 SURF #5",
    description: "Surf Boreas",
    map: "surf_boreas",
    ip: "play.cs2surf.pro:27016",
    image: "/surf_boreas.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27016"
  },
  {
    name: "CS2 SURF #6",
    description: "Surf VARIETY",
    map: "surf_variety",
    ip: "play.cs2surf.pro:27028",
    image: "/surf_all2.svg",
    type: "surf",
    connect: "PLAY.CS2SURF.PRO:27028"
  },
  {
    name: "CS2 ARENA",
    description: "Arena",
    map: "aim_redline",
    ip: "play.cs2surf.pro:27024",
    image: "/aim_redline.svg",
    type: "arena",
    connect: "PLAY.CS2SURF.PRO:27024"
  },
  {
    name: "CS2 DM #1",
    description: "DM #1",
    map: "mirage",
    ip: "play.cs2surf.pro:27020",
    image: "/mirage.svg",
    type: "dm",
    connect: "PLAY.CS2SURF.PRO:27020"
  },
  {
    name: "CS2 KZ #1",
    description: "KZ Server",
    map: "kz_grotto",
    ip: "play.cs2surf.pro:27021",
    image: "/kz_grotto.svg",
    type: "kz",
    connect: "PLAY.CS2SURF.PRO:27021"
  }
];

const ServerCard = ({ server, handleCopy }: { server: Server; handleCopy: (ip: string) => void }) => {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    handleCopy(`connect ${server.ip}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
<motion.div 
  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
  style={{ width: '100%', height: '100%' }} 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  <Image src={server.image} alt={server.name} width={320} height={160} className="w-full h-32 md:h-40 object-cover" />
  <div className="p-3">
    <h2 className="text-base font-bold mb-2">{server.name}</h2>
    <p className="text-xs text-gray-400 mr-4">Map: {server.map}</p>
    <div className="flex items-center mb-2">
      <span className="text-xs text-gray-400 mr-4">{server.connect}</span>
      <div className="flex gap-2 w-3/10"> 
      <button
        onClick={copyIP}
        className={`w-full ${copied ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'} text-white font-bold py-1 px-2 rounded flex items-center justify-center transition duration-300`}
      >
        {copied ? "Copied!" : "Copy IP"}
        <FaCopy className="ml-1" />
      </button>
        <a
          href={`steam://connect/${server.ip}`}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded flex items-center justify-center transition duration-300"
        >
          Connect
          <FaPlay className="ml-1" />
        </a>
      </div>
    </div>
  </div>
</motion.div>
  );
};

interface RoadmapItem {
  text: string;
  completed: boolean;
  details: string;
}

const roadmapItems: RoadmapItem[] = [
  { text: "Fix say !r actually resetting the player", completed: false, details: "Ensure that the '!r' command properly resets the player's position and state." },
  { text: "Implement Credit System", completed: false, details: "Develop a credit system that allows players to earn and accumulate credits through gameplay." },
  { text: "Enable players to earn and spend Credits on website cases", completed: false, details: "Create a system for players to use their earned credits to open cases containing in-game rewards." },
  { text: "Add different roles (Coach, Helper, Mod)", completed: false, details: "Implement a role system to recognize and empower community members who contribute to the server." },
  { text: "Create new Global Points Ranking System", completed: false, details: "Develop a comprehensive ranking system that tracks player performance across all servers." },
  { text: "Polish CVARS for smoother experience", completed: false, details: "Fine-tune server variables to ensure optimal gameplay and performance." },
];

const RoadmapItem = ({ item, index }: { item: RoadmapItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {item.completed ? (
          <FaCheckCircle className="text-green-500 text-xl" />
        ) : (
          <FaRegCircle className="text-gray-400 text-xl" />
        )}
        <span className={`text-lg ${item.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {item.text}
        </span>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-7 mt-2 text-gray-400 text-sm"
          >
            {item.details}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

interface HomeProps {
  handleCopy: (text: string) => void;
}

export default function Home({ handleCopy }: HomeProps) {
  const [activeTab, setActiveTab] = useState<'servers' | 'roadmap' | 'community'>('servers');
  const [selectedServerType, setSelectedServerType] = useState<string>('surf');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const serverTypes = ['surf', 'arena', 'dm', 'kz'];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <motion.h1 
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      </motion.h1>

      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="mb-2 md:mb-3">
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {['servers', 'roadmap', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'servers' | 'roadmap' | 'community')}
                className={`px-2 py-1 md:px-3 md:py-2 text-sm md:text-base rounded-md transition duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex-grow ${isAnimating ? 'overflow-hidden' : 'overflow-auto'}`}
          >
            {activeTab === 'servers' && (
              <div className="h-full flex flex-col overflow-hidden">
                <div className="mb-2 md:mb-3">
                  <h2 className="text-lg md:text-xl font-bold mb-2 text-center">Select Server Type</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {serverTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedServerType(type)}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg font-semibold transition duration-300 ${
                          selectedServerType === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedServerType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow overflow-y-auto"
                  >
                    <h3 className="text-lg font-bold mb-2 text-center">
                      {selectedServerType.charAt(0).toUpperCase() + selectedServerType.slice(1)} Servers
                    </h3>
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-4">
                      <AnimatePresence>
                        {servers
                          .filter((server) => server.type === selectedServerType)
                          .map((server) => (
                            <motion.div
                              key={server.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ServerCard server={server} handleCopy={handleCopy} />
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className={`h-full ${isAnimating ? 'overflow-hidden' : 'overflow-auto'}`}>
                <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Development Roadmap</h2>
                  <p className="text-gray-400 mb-2 text-sm">Our plans for improving your CS2 Surf experience. Click on an item to see more details.</p>
                  <ul className="space-y-2">
                    {roadmapItems.map((item, index) => (
                      <RoadmapItem key={index} item={item} index={index} />
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className={`h-full ${isAnimating ? 'overflow-hidden' : 'overflow-auto'}`}>
                <div className="bg-gray-800 rounded-lg p-3 md:p-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2">Join Our Community</h2>
                  <p className="text-gray-400 mb-2 text-sm">Connect with other CS2 Surf enthusiasts</p>
                  <p className="mb-2 text-sm">We value your input! If you have any suggestions for improving our servers or website, please don&apos;t hesitate to reach out to us on Discord or Steam.</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
                    <a
                      href="https://discord.gg/n4xCDWrQRB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#7289DA] hover:bg-[#677BC4] text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
                    >
                      <FaDiscord className="mr-2" /> Join Discord
                    </a>
                    <a
                      href="https://steamcommunity.com/groups/CS2SURFpro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#171a21] hover:bg-[#2a475e] text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
                    >
                      <FaSteam className="mr-2" /> Steam Group
                    </a>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="mb-2">Website created by JKE. Special thanks to the CS:GO community for their support and feedback.</p>
                    <p className="mb-2">Credits to Bagoot for giving so much inspiration.</p>
                    <p className="mb-2">Credits to Waycbenne, a very nice guy.</p>
                    <p className="mb-2">If you want to contribute to the Project, check out the GitHub: <a href="https://github.com/jke-c/cs2-web" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://github.com/jke-c</a></p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}