import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/steam/callback`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const steamLoginUrl = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${REDIRECT_URI}&openid.realm=${process.env.NEXT_PUBLIC_BASE_URL}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`;
      res.redirect(steamLoginUrl);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
