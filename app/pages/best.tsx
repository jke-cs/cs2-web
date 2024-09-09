import React, { useState, useEffect } from 'react';
import { FaTrophy, FaSteam, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PlayerData {
  PlayerName: string;
  SteamID: string;
  GlobalPoints: number;
  TimesConnected: number;
  LastConnected: number;
  HideTimerHud: number;
  HideKeys: number;
  HideJS: number;
  SoundsEnabled: number;
  PlayerFov: number;
  IsVip: number;
  BigGifID: string;
}

const PCLeaderboard = ({ currentPlayers, indexOfFirstPlayer, getPointsStyle }: { currentPlayers: PlayerData[], indexOfFirstPlayer: number, getPointsStyle: (rank: number) => string }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-700">
        <tr>
          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">Rank</th>
          <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">Player</th>
          <th className="px-2 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">Points</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {currentPlayers.map((player: PlayerData, index: number) => {
          const rank = indexOfFirstPlayer + index + 1;
          const pointsStyle = getPointsStyle(rank);
          return (
            <tr key={player.SteamID} className="hover:bg-gray-700 transition-colors duration-200">
              <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  {rank <= 3 ? (
                    <FaTrophy className={`text-xl sm:text-2xl mr-1 sm:mr-2 ${
                      rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-yellow-700'
                    }`} />
                  ) : (
                    <span className="text-sm sm:text-lg font-semibold w-6 sm:w-8 text-center">{rank}</span>
                  )}
                </div>
              </td>
              <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <a href={`https://steamcommunity.com/profiles/${player.SteamID}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mr-2">
                    <FaSteam />
                  </a>
                  <span className="text-sm sm:text-lg font-medium">{player.PlayerName}</span>
                </div>
              </td>
              <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-right">
                <span className={`px-2 sm:px-4 py-1 sm:py-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${pointsStyle}`}>
                  {player.GlobalPoints.toLocaleString()}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const MobileLeaderboard = ({ currentPlayers, indexOfFirstPlayer, getPointsStyle }: { currentPlayers: PlayerData[], indexOfFirstPlayer: number, getPointsStyle: (rank: number) => string }) => (
  <div className="space-y-2 sm:space-y-4">
    {currentPlayers.map((player: PlayerData, index: number) => {
      const rank = indexOfFirstPlayer + index + 1;
      const pointsStyle = getPointsStyle(rank);
      return (
        <div key={player.SteamID} className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <div className="flex items-center">
              {rank <= 3 && <FaTrophy className={`mr-1 sm:mr-2 ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-yellow-700'}`} />}
              <span className="font-bold text-sm sm:text-base">{rank}</span>
            </div>
            <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${pointsStyle}`}>
              {player.GlobalPoints.toLocaleString()} pts
            </span>
          </div>
          <div className="flex items-center">
            <a href={`https://steamcommunity.com/profiles/${player.SteamID}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mr-2">
              <FaSteam />
            </a>
            <span className="text-sm sm:text-lg font-medium">{player.PlayerName}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default function Best() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const playersPerPage = 10;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/getPlayers');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = leaderboard.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(leaderboard.length / playersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPageRange = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const getPointsStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-gray-900';
    if (rank === 2) return 'bg-gray-300 text-gray-900';
    if (rank === 3) return 'bg-yellow-700 text-white';
    return 'bg-gray-600 text-white';
  };

  if (isLoading) {
    return <div className="text-center p-4 sm:p-8">Loading leaderboard...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Leaderboard */}
      <div className="w-full md:w-3/5 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Top Players</h1>
        
        {isMobile ? (
          <MobileLeaderboard
            currentPlayers={currentPlayers}
            indexOfFirstPlayer={indexOfFirstPlayer}
            getPointsStyle={getPointsStyle}
          />
        ) : (
          <PCLeaderboard
            currentPlayers={currentPlayers}
            indexOfFirstPlayer={indexOfFirstPlayer}
            getPointsStyle={getPointsStyle}
          />
        )}
        
        {/* Pagination */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              <span className="sr-only">First</span>
              <FaChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <FaChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
            {getPageRange().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && paginate(page)}
                className={`relative inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-gray-700 bg-gray-800 text-xs sm:text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              <span className="sr-only">Last</span>
              <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </nav>
        </div>
      </div>

      {/* Right column for Global Points and Ranks */}
      <div className="w-full md:w-2/5 space-y-4 sm:space-y-6 md:space-y-8">
        {/* How to get Global Points */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">How to get Global Points</h2>
          <ul className="space-y-2">
            {[
              { action: "Complete Map 1st", points: 2000 },
              { action: "Beat SR", points: 1000 },
              { action: "Complete Map", points: 31 },
              { action: "Beat PB", points: 20 },
            ].map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-700 rounded-lg p-2 sm:p-3">
                <span className="text-sm sm:text-base">{item.action}</span>
                <span className="font-semibold text-green-400 text-sm sm:text-base">+{item.points} Points</span>
              </li>
            ))}
          </ul>
        </div>

     {/* In-game Ranks */}
   <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">In-game Ranks</h2>
          <ul className="space-y-2">
            {[
              { rank: "Legend", color: "text-yellow-400", top: "0.05%" },
              { rank: "PRO", color: "text-purple-400", top: "0.1%" },
              { rank: "OG", color: "text-red-400", top: "2.5%" },
              { rank: "Master", color: "text-blue-400", top: "10%" },
              { rank: "Diamond", color: "text-cyan-400", top: "20%" },
              { rank: "Platinum", color: "text-green-400", top: "30%" },
              { rank: "Gold", color: "text-yellow-600", top: "40%" },
              { rank: "Silver", color: "text-gray-400", top: "50%" },
              { rank: "Bronze", color: "text-yellow-800", top: "99%" },
            ].map((item, index) => (
              <li key={index} className="bg-gray-700 rounded-lg p-2 sm:p-3 flex justify-between items-center">
                <span className={`font-semibold ${item.color} text-sm sm:text-base`}>[{item.rank}]</span>
                <span className="text-xs sm:text-sm">Top {item.top}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}