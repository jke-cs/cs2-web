// pages/leaderboard.js
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost/php/leaderboard.php');
      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="player-stats-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th className="global-points-heading" style={{ textAlign: 'left' }}>Global Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <a href={`https://steamcommunity.com/profiles/${item.SteamID}`} target="_blank" rel="noopener noreferrer">
                  {item.PlayerName}
                </a>
              </td>
              <td className="global-points-cell" style={{ /* style definitions */ }}>
                {item.GlobalPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
