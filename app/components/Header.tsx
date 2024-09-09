import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaTrophy, FaDiscord, FaSketch, FaCog, FaPlay, FaGift, FaBook } from 'react-icons/fa'

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User | null;
  onLogin: () => void;
}

interface User {
  steamName: string;
  avatarUrl: string;
}

export default function Header({ activeSection, setActiveSection, user, onLogin }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'home', icon: FaPlay, label: 'Play' },
    { name: 'best', icon: FaTrophy, label: 'Best' },
    { name: 'skins', icon: () => <Image src="/skins2.svg" alt="Skins" width={22} height={24} />, label: 'Skins', isExternal: true, url: 'https://cs2surf.de' },
    { name: 'inventory', icon: FaSketch, label: 'Inventory', isExternal: true, url: 'http://inv.cs2surf.pro:3000' },
    { name: 'giveaway', icon: FaGift, label: 'Giveaway' },
  ]

  const secondaryItems = [
    { name: 'docs', icon: FaBook, label: 'Docs', isExternal: true, url: 'https://docs.cs2surf.pro' },
    { name: 'discord', icon: FaDiscord, label: 'Join Discord', isExternal: true, url: 'https://discord.gg/n4xCDWrQRB' },
    { name: 'settings', icon: FaCog, label: 'Settings' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 h-screen bg-gray-900 flex flex-col items-start py-4 shadow-lg z-50 overflow-hidden"
      initial={false}
      animate={{ 
        width: isMobile 
          ? isExpanded ? '100%' : '0px'
          : isExpanded ? 'var(--nav-width-expanded)' : 'var(--nav-width-collapsed)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
      style={{
        '--nav-width-collapsed': '64px',
        '--nav-width-expanded': '220px',
      } as React.CSSProperties}
    >
      <div className="flex justify-between items-center w-full px-2 mb-6">
        <div className="ml-1">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
        </div>
        {isMobile && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-white"
          >
            {isExpanded ? 'Close' : 'Menu'}
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-1 w-full px-2 flex-grow overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={activeSection === item.name}
            isExpanded={isExpanded || isMobile}
            onClick={() => {
              handleItemClick(item, setActiveSection);
              isMobile && setIsExpanded(false);
            }}
          />
        ))}
      </div>
      <div className="mt-auto mb-4 px-2 w-full space-y-1">
        {secondaryItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={activeSection === item.name}
            isExpanded={isExpanded || isMobile}
            onClick={() => {
              handleItemClick(item, setActiveSection);
              isMobile && setIsExpanded(false);
            }}
          />
        ))}
      </div>
    </motion.nav>
  )
}

interface NavItemProps {
  item: { 
    name: string; 
    icon: React.ElementType; 
    label: string;
    isExternal?: boolean;
    url?: string;
  };
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

function NavItem({ item, isActive, isExpanded, onClick }: NavItemProps) {
  return (
    <motion.button
      className={`p-2 rounded-lg transition-colors duration-200 ease-in-out flex items-center w-full ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <item.icon className="text-xl min-w-[20px]" />
      <motion.div
        className="ml-3 overflow-hidden"
        initial={false}
        animate={{ width: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.span
          className="text-sm font-medium whitespace-nowrap block"
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {item.label}
        </motion.span>
      </motion.div>
    </motion.button>
  )
}

function handleItemClick(item: NavItemProps['item'], setActiveSection: (section: string) => void) {
  if (item.isExternal && item.url) {
    window.open(item.url, '_blank')
  } else {
    setActiveSection(item.name)
  }
}
