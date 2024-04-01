import {StreamClient} from '@stream-io/node-sdk'

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;
export async function POST(req: NextRequest) {
  const user = await req.json()
  if (!user) throw new Error('user is not logged in');
  if (!apiKey) throw new Error('No API key');
  if (!apiSecret) throw new Error('No API secret');

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.floor(Date.now() / 1000) - 60;

  return new Response(JSON.stringify({clientId: client.createToken(user.id, exp, issued)}), { status: 201 });
}
