'use client'

import { useState, useEffect } from 'react'
import Layout from './Layout'
import Home from '../pages/home'
import Best from '../pages/best'
import Settings from '../pages/settings'
import Giveaway from '../pages/giveaway'
import Skins from '../pages/skins'

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

export default function MainContent() {
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .catch((err) => {
          console.error('Failed to copy: ', err);
          fallbackCopyTextToClipboard(text);
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const sortedPlayers = [...players].sort((a, b) => b.GlobalPoints - a.GlobalPoints);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === 'home' && (
        <Home 
          handleCopy={handleCopy}
        />
      )}
      {activeSection === 'best' && <Best />}
      {activeSection === 'settings' && (
        <Settings 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
      {activeSection === 'giveaway' && (
      <Giveaway 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        />
      )}
    </Layout>
  );
}