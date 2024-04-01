"use client"
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import {ReactNode, useEffect, useState} from 'react'
import {useUser} from '@clerk/nextjs'
import {BFF} from '@/app/api/utils'
import Loader from '@/components/Loader'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

const StreamVideoProvider = ({children}: {children: ReactNode}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const {user, isLoaded} = useUser()
  useEffect( () => {
    if (!user || !isLoaded) return
    if (!apiKey) throw  new Error("Stream Api key missing")

    const setup = async () => {
      const response = await BFF.post<{clientId: string}>("/api/auth", {
        body: {id: user.id},
      })

      const client = new StreamVideoClient({
        apiKey,
        user: {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        token: response.data?.clientId,
      });

      setVideoClient(client);
    };

    setup();
  }, [user, isLoaded] );

  if(!videoClient) return <Loader />
  return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
  );
};


export default StreamVideoProvider