"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface PlayerData {
  PlayerName: string;
  SteamID: string;
  GlobalPoints: number;
}
function closeHeader() {
  const header = document.getElementById('header');
  if (header) header.style['display'] = 'none';
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [tableData, setTableData] = useState<any[]>([]);

  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/getPlayers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-cbble.svg')] bg-cover bg-center z-[-1]"></div>
      
<header
  id="header"
  className="text-white text-center py-1.5 fixed top-0 left-16 z-50 opacity-80"
  style={{
    height: '40px',
    width: 'calc(100% - 60px)', 
    marginRight: '20px', 
    position: 'fixed',
    boxSizing: 'border-box', 
    background: 'linear-gradient(to right, #e6b3ff, #660066)'
  }}
>
  <span
    className="close-btn cursor-pointer text-white text-xl"
    onClick={closeHeader}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  >
    &#x2715;
  </span>
  <span>
    50€ giveaway for the player with the most global points in one month. Join the <a href="https://discord.gg/n4xCDWrQRB" className="text-white underline">Discord</a> for more infos.
  </span>
</header>
 

      <nav className="fixed top-0 left-0 h-full w-16 bg-gray-900 flex flex-col items-center py-4">
        <a 
          href="#SURF" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'home' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('home')}
        >
          <Image 
            src="/surflogo32.svg" 
            alt="Home Icon" 
            width={32} 
            height={32} 
          />
          <p className="text-white text-xs mt-1">SURF</p>
        </a>
        <a 
          href="#KZ" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'person' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('person')}
        >
          <Image 
            src="/kzlogo32.svg" 
            alt="Person Icon" 
            width={32} 
            height={32} 
          />
          <p className="text-white text-xs mt-1">‎ ‎‎‎ KZ</p>
        </a>
      
        <a 
          href="#DM" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'dm' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('dm')}
        >
          <Image 
            src="/surflogo32.svg" 
            alt="DM Icon" 
            width={32} 
            height={32} 
          />
          <p className="text-white text-xs mt-1">‎ ‎‎DM</p>
        </a>
      
          <a 
  			href="#ARENA" 
 			className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'arena' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
  			onClick={() => setActiveSection('arena')}
		>
  			<Image 
    		src="/surflogo32.svg" 
    		alt="Arena Icon" 
    		width={32} 
    		height={32} 
  			/>
  			<p className="text-white text-xs mt-1">ARENA</p>
		</a>
        <a 
          href="https://cs2surf.de/skins" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'skins' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('skins')}
        >
            <Image 
              src="/skins.svg" 
              alt="Skins Icon" 
              width={32} 
              height={32} 
            />
          <p className="text-white text-xs mt-1">SKINS</p>
        </a>
        
        <a 
          href="#BEST" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'best' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('best')}
        >
            <Image 
              src="/trophy.svg" 
              alt="Best Icon" 
              width={32} 
              height={32} 
            />
         <p className="text-white text-xs mt-1">BEST</p>
        </a>


        <a 
          href="#SETTINGS" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'settings' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('settings')}
        >
          ⚙️
        </a>
      </nav>

      <main className="flex-1 min-h-screen flex flex-col items-center justify-start p-24 ml-16 relative z-10">

      

  <div className="relative z-[-1] flex place-items-center before:absolute before:h-[10px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-0 after:h-[100px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
  <div className="relative z-[-150] flex place-items-center before:absolute before:bottom-[-800px] before:left-[-600px] before:h-[20px] before:w-full before:rounded-full before:bg-gradient-radial before:from-purple-700 before:to-transparent before:blur-3xl before:opacity-80 before:content-[''] after:absolute after:bottom-[-300px] after:left-[-600px] after:-z-0 after:h-[200px] after:w-full after:bg-gradient-conic after:from-purple-500 after:via-purple-700 after:blur-3xl after:opacity-20 after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-900 before:dark:opacity-20 after:dark:from-purple-800 after:dark:via-purple-600 after:dark:opacity-12 sm:before:w-[600px] sm:after:w-[300px] before:lg:h-[400px]"></div>


 <div className="w-full max-w-6xl grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {activeSection === 'home' && (
 
      <>
 

              <a
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-semibold">
                  CS2 SURF #1{""}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <Image
                  src="/surf_utopia.svg"
                  alt="Surf KZ"
                  width={400}
                  height={100}
                  className="mb-3"
                />
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  connect play.cs2surf.pro:27015
                  <CopyToClipboard text="play.cs2surf.pro:27015" onCopy={() => alert('Copied to clipboard!')}>
                    <button className="ml-2 text-gray-500 hover:text-gray-700">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </p>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Map: surf_utopia
                </p>
              </a>

              <a
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-semibold">
                  CS2 SURF #2{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <Image
                  src="/surf_nyx.svg"
                  alt="Surf Nyx"
                  width={400} 
                  height={100} 
                  className="mb-3"
                />
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  connect play.cs2surf.pro:27017
                  <CopyToClipboard text="play.cs2surf.pro:27017" onCopy={() => alert('Copied to clipboard!')}>
                    <button className="ml-2 text-gray-500 hover:text-gray-700">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </p>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Map: surf_nyx
                </p>
              </a>

              <a
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-semibold">
                  CS2 SURF #3{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <Image
                  src="/surf_me.svg"
                  alt="Surf Me"
                  width={400} 
                  height={100} 
                  className="mb-3"
                />
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  connect play.cs2surf.pro:27018
                  <CopyToClipboard text="play.cs2surf.pro:27018" onCopy={() => alert('Copied to clipboard!')}>
                    <button className="ml-2 text-gray-500 hover:text-gray-700">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </p>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Map: surf_me
                </p>
              </a>

              <a
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-semibold">
                  CS2 SURF #4{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <Image
                  src="/surf_rookie.svg"
                  alt="Surf Rookie"
                  width={400}
                  height={100}
                  className="mb-3"
                />
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  connect play.cs2surf.pro:27019
                  <CopyToClipboard text="play.cs2surf.pro:27019" onCopy={() => alert('Copied to clipboard!')}>
                    <button className="ml-2 text-gray-500 hover:text-gray-700">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </p>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Map: surf_rookie
                </p>
              </a>

              <a
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-semibold">
                  CS2 SURF #5{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <Image
                  src="/surf_boreas.svg"
                  alt="Surf Boreas"
                  width={400} 
                  height={100} 
                  className="mb-3"
                />
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  connect play.cs2surf.pro:27016
                  <CopyToClipboard text="play.cs2surf.pro:27016" onCopy={() => alert('Copied to clipboard!')}>
                    <button className="ml-2 text-gray-500 hover:text-gray-700">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </p>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Map: surf_boreas
                </p>
              </a>

            </>
          )}

 
<div className="flex flex-col space-y-4 absolute right-8 top-24">
  <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xs z-20 opacity-50 animate-slide-in-and-stay delay-0">
    <p className="text-center text-lg font-semibold mb-4"></p>
    <div className="text-sm">
      <h3 className="font-semibold mb-2">Roadmap:</h3>
      <ul className="list-disc list-inside">
        <li>Fix say !r actually resetting the player</li>
        <li>Implement Leaderboard on the website</li>
        <li>Implement Credit System</li>
        <li>Together with the Credit System Players are able to earn Credits and spend them on cases on the website</li>
        <li>Add different roles like Coach, Helper, Mod...</li>
        <li>Create new Global Points Ranking System</li>
        <li>Polish CVARS to get smoother experience!!!!!</li>
      </ul>
    </div>
  </div>

  <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xs z-20 opacity-50 animate-slide-in-and-stay delay-500">
    <p className="text-center text-lg font-semibold mb-4"></p>
    <div className="text-sm">
      <h3 className="font-semibold mb-2">Suggestions:</h3>
      <ul className="list-disc list-inside">
        <li>If you have any suggestions for the web or surf, use the Threads on the Discord Server</li>
      </ul>
    </div>
  </div>

  <div className="bg-orange-800 text-white p-6 rounded-lg shadow-lg max-w-xs z-20 opacity-50 animate-slide-in-and-stay delay-1000">
    <p className="text-center text-lg font-semibold mb-4"></p>
    <div className="text-sm">
      <h3 className="font-semibold mb-2">Credits:</h3>
      <ul className="list-disc list-inside">
        <li>Credits to Bagoot for giving so much inspiration</li>
        <li>Credits to Waycbenne very nice guy</li>
        <li>If you want to contribute to the Project checkout the GitHub</li>
        <li><a href="https://github.com/jke-c" className="text-white underline">https://github.com/jke-c</a></li>
      </ul>
    </div>
  </div>
</div>






{activeSection === 'skins' && (
  <a
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className="text-2xl font-semibold">
      CS2 SKINS
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <Image
      src="/skins.svg"
      alt="Skins"
      width={400}
      height={100}
      className="mb-3"
    />
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Map: skins
    </p>
  </a>


)}
  
{activeSection === 'best' && (
  <div className="container mx-auto px-4 py-8 flex">
    <div className="flex-grow">

      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden" style={{ width: '800px' }}>
        <table className="w-full table-fixed divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Global Points</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentPlayers.map((player, index) => {
              let bgColor = 'bg-green-100 text-green-800'; // Default color
              if (index === 0) {
                bgColor = 'bg-purple-500 text-purple-100'; // Rank 1
              } else if (index === 1) {
                bgColor = 'bg-red-500 text-red-100'; // Rank 2
              } else if (index === 2) {
                bgColor = 'bg-orange-500 text-orange-100'; // Rank 3
              }

              return (
                <tr key={player.SteamID} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{indexOfFirstPlayer + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.PlayerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
                      {player.GlobalPoints}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {Math.ceil(players.length / playersPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(players.length / playersPerPage)}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
    <div className="ml-12">
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden" style={{ width: '260px', height: '627px', opacity: 0.8 }}>
        <div className="px-6 py-4 text-gray-300">
          <h2 className="text-xl font-bold">How to get GlobalPoints:</h2>
          <p className="mt-2">Complete Map 1st: +2000 Points</p>
          <p className="mt-2">Beat SR: +1000 Points</p>
          <p className="mt-2">Complete Map: +31 Points</p>
          <p className="mt-2">Beat PB: +20 Points</p>
          <div className="my-6"></div>
          <h2 className="text-xl font-bold">Ingame Ranks:</h2>
          <p className="mt-2 text-purple-400">&#91;<span className="text-purple-500">PRO</span>&#93; - Top 0.05%</p>
          <p className="mt-2 text-red-500">&#91;OG&#93; - Top 0.1%</p>
          <p className="mt-2 text-orange-500">&#91;Legend&#93; - Top 2.5%</p>
          <p className="mt-2 text-green-300">&#91;Master&#93; - Top 10%</p>
          <p className="mt-2 text-red-500">&#91;Diamond&#93; - Top 20%</p>
          <p className="mt-2 text-blue-500">&#91;Platinum&#93; - Top 30%</p>
          <p className="mt-2 text-yellow-400">&#91;Gold&#93; - Top 40%</p>
          <p className="mt-2 text-gray-500">&#91;Silver&#93; - Top 50%</p>
          <p className="mt-2 text-brown-300">&#91;Bronze&#93; - Top 99%</p>
        </div>
      </div>
    </div>
  </div>
)}


  
  {activeSection === 'arena' && (
  <a
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2 className="text-2xl font-semibold">
      CS2 ARENA{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </h2>
    <Image
      src="/aim_redline.svg"
      alt="Arena"
      width={400}
      height={100} 
      className="mb-3"
    />
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      connect play.cs2surf.pro:27024
      <CopyToClipboard text="play.cs2surf.pro:27024" onCopy={() => alert('Copied to clipboard!')}>
        <button className="ml-2 text-gray-500 hover:text-gray-700">
          <FaCopy />
        </button>
      </CopyToClipboard>
    </p>
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Map: aim_redline
    </p>
  </a>
)}

          {activeSection === 'person' && (
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-2xl font-semibold">
                CS2 KZ #1{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <Image
                src="/kz_skytower.svg"
                alt="Mirage"
                width={400}
                height={100} 
                className="mb-3"
              />
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                connect play.cs2surf.pro:27021
                <CopyToClipboard text="play.cs2surf.pro:27021" onCopy={() => alert('Copied to clipboard!')}>
                  <button className="ml-2 text-gray-500 hover:text-gray-700">
                    <FaCopy />
                  </button>
                </CopyToClipboard>
              </p>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Map: kz_skytower
              </p>
            </a>
          )}

          {activeSection === 'dm' && (
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-2xl font-semibold">
                CS2 DM #1{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <Image
                src="/mirage.svg"
                alt="DM #1"
                width={400} 
                height={100} 
                className="mb-3"
              />
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                connect play.cs2surf.pro:27020
                <CopyToClipboard text="play.cs2surf.pro:27020" onCopy={() => alert('Copied to clipboard!')}>
                  <button className="ml-2 text-gray-500 hover:text-gray-700">
                    <FaCopy />
                  </button>
                </CopyToClipboard>
              </p>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Map: mirage
              </p>
            </a>
          )}

          {activeSection === 'settings' && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold">
                Settings Section{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                SOON.
              </p>
  
            </div>
          )}
        </div>
<footer className="w-full text-center py-2 bg-gray-900 text-white text-sm absolute bottom-0 left-0">
  <p className="animate-slide-in-once">This website was created by JKE &copy;</p>
</footer>




      </main>
    </div>
    
  );
}
