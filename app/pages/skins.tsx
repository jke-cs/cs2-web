import { useEffect } from 'react';

export default function Skins() {
  useEffect(() => {
    window.location.href = 'https://cs2surf.de';
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
