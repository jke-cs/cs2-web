import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FaSteam } from 'react-icons/fa'
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface User {
  steamName: string;
  avatarUrl: string;
}

export default function Layout({ children, activeSection, setActiveSection }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const steamName = params.get('steamName');
    const avatarUrl = params.get('avatarUrl');

    if (steamName && avatarUrl) {
      setUser({ steamName, avatarUrl });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSteamLogin = () => {
    window.location.href = '/api/auth/steam';
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden bg-[#11141c]">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        onLogin={handleSteamLogin}
      />
      <main className="flex-1 flex flex-col md:ml-16 relative z-10">
        <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-7xl">
            <div className="mb-4 md:mb-0 md:fixed md:top-4 md:right-4 z-50">
              {user ? (
                <div className="flex items-center bg-gray-800 rounded-full p-2">
                  <Image src={user.avatarUrl} alt={user.steamName} width={32} height={32} className="rounded-full mr-2" />
                  <span className="text-white text-sm">{user.steamName}</span>
                </div>
              ) : (
                <button
                  onClick={handleSteamLogin}
                  className="bg-[#171a21] text-white px-4 py-2 rounded-full flex items-center hover:bg-[#2a475e] transition-colors duration-200"
                >
                  <FaSteam className="mr-2" />
                  Sign in with Steam
                </button>
              )}
            </div>
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
