import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const STEAM_API_KEY = process.env.STEAM_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  if (query['openid.ns'] && query['openid.identity']) {
    const steamId = query['openid.identity'].toString().split('/').pop();

    try {
      const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`);
      const playerData = response.data.response.players[0];

      res.redirect(`/?steamName=${encodeURIComponent(playerData.personaname)}&avatarUrl=${encodeURIComponent(playerData.avatarmedium)}`);
    } catch (error) {
      console.error('Error fetching Steam user data:', error);
      res.status(500).json({ error: 'Failed to fetch Steam user data' });
    }
  } else {
    res.status(400).json({ error: 'Invalid Steam authentication response' });
  }
}