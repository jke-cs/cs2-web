"use client";
import { useState } from 'react';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa'; // Stelle sicher, dass du react-icons installiert hast
import { useEffect } from 'react';
import axios from 'axios';

interface PlayerData {
  PlayerName: string;
  SteamID: string;
  GlobalPoints: number;
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [tableData, setTableData] = useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/route'); // Passe den Pfad zur API-Routingdatei an
      setTableData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  fetchData();
}, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  return (
    <div className="flex relative min-h-screen overflow-hidden">
      {/* Hintergrund SVG */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-cbble.svg')] bg-cover bg-center z-[-1]"></div>
      
<header className="w-full bg-red-600 text-white text-center py-1.5 fixed top-0 left-[65px] z-50 opacity-80 " style={{ height: '40px' }}>
  50€ giveaway for the player with the most global points in one month. Join the Discord for more infos.
</header>


      {/* Navigationsleiste */}
      <nav className="fixed top-0 left-0 h-full w-16 bg-gray-900 flex flex-col items-center py-4">
        <a 
          href="#section1" 
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
          href="#section2" 
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
          href="#section3" 
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
  			href="#section5" 
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
          href="#section6" 
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
          href="#section4" 
          className={`group mb-6 p-2 rounded-lg border border-transparent transition-colors ${activeSection === 'settings' ? 'text-white bg-gray-100 border-gray-300 dark:bg-neutral-800/30 dark:border-neutral-700' : 'text-gray-400 hover:text-white hover:bg-gray-100 hover:border-gray-300 hover:dark:bg-neutral-800/30 hover:dark:border-neutral-700'}`}
          onClick={() => setActiveSection('settings')}
        >
          ⚙️
        </a>
      </nav>

      <main className="flex-1 min-h-screen flex flex-col items-center justify-because p-24 ml-16 relative z-10">
      

  {/* Spielerstatistiken Tabelle */}
  <div className="relative z-[-1] flex place-items-center before:absolute before:h-[10px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-0 after:h-[100px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>

  {/* Conditional Rendering der Widgets basierend auf dem aktiven Abschnitt */}
  <div className="mb-24 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
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
                  width={400} // Anpassen, falls nötig
                  height={100} // Anpassen, falls nötig
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
                  width={400} // Anpassen, falls nötig
                  height={100} // Anpassen, falls nötig
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
                  width={400} // Anpassen, falls nötig
                  height={100} // Anpassen, falls nötig
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
                  width={400} // Anpassen, falls nötig
                  height={100} // Anpassen, falls nötig
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
                  width={400} // Anpassen, falls nötig
                  height={100} // Anpassen, falls nötig
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
        {/* Discord Widget */}
<div className="absolute top-24 left-0 ml-8">
<iframe src="https://discord.com/widget?id=371718546121556002&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
</div>
  
<div className="absolute top-24 right-8 bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-xs z-20 opacity-50">
  <p className="text-center text-lg font-semibold mb-4">
    {/* Optionaler Begrüßungstext hier */}
  </p>
  <div className="text-sm">
    <h3 className="font-semibold mb-2">Roadmap:</h3>
    <ul className="list-disc list-inside">
      <li>Fix say !r actually resetting the player</li>
      <li>Implement Leaderboard on the website</li>
      <li>Implement Credit System</li>
      <li>Together with the Credit System Players are able to earn Credits and spend them on cases on the website</li>
      <li>Add different roles like Coach,Helper, Mod...</li>
      <li>Create new Global Points Ranking System</li>
      <li>Polish CVARS to get smoother experience</li>
    </ul>
  </div>
</div>

<div className="absolute right-8 bg-orange-800 text-white p-6 rounded-lg shadow-lg max-w-xs z-20 opacity-50" style={{ top: '70%' }}>
  <p className="text-center text-lg font-semibold mb-4">
    {/* Optionaler Begrüßungstext hier */}
  </p>
  <div className="text-sm">
    <h3 className="font-semibold mb-2">Credits:</h3>
    <ul className="list-disc list-inside">
      <li>Credits to Bagoot for giving so much inspiration</li>
      <li>Credits to Waycbenne very nice guy</li>
      <li>If you want to contribute to the Project checkout the GitHub</li>
      <li>https://gitgub.com/jke-cs</li>
    </ul>
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
      width={400} // Anpassen, falls nötig
      height={100} // Anpassen, falls nötig
      className="mb-3"
    />
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Map: skins
    </p>
  </a>
)}
  
{activeSection === 'best' && (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {tableData[0] && Object.keys(tableData[0]).map((key) => (
            <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tableData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
      src="/aim_redline.svg" // Bild wie bei der KZ-Sektion
      alt="Arena"
      width={400} // Anpassen, falls nötig
      height={100} // Anpassen, falls nötig
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
                width={400} // Anpassen, falls nötig
                height={100} // Anpassen, falls nötig
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
                src="/mirage.svg" // Bild wie bei der Home-Sektion
                alt="DM #1"
                width={400} // Anpassen, falls nötig
                height={100} // Anpassen, falls nötig
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
        <footer className="w-full text-center py-2 bg-[rgba(255,255,255,0.8)] text-black absolute bottom-0 left-0">
  <p>This website was created by JKE (c)</p>
</footer>


      </main>
    </div>
    
  );
}
