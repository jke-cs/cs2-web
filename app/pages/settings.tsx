import React from 'react'

interface SettingsProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Settings({ activeSection, setActiveSection }: SettingsProps) {
  return (
    <div>
      <h1>Well this is awkward...</h1>
      {/* Add your settings content here */}
    </div>
  )
}