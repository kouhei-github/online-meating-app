"use client"
import {useUser} from '@clerk/nextjs'
import {StreamCall, StreamTheme} from '@stream-io/video-react-sdk'
import {useState} from 'react'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import {useGetCallByid} from '@/hooks/useGetCallByid'
import Loader from '@/components/Loader'

const Meeting = ({params}: {params: {id: string}}) => {
  const {user, isLoaded} = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const {call, isCallLoading} = useGetCallByid(params.id)

  if(!isLoaded || isCallLoading) return <Loader />


  return (
    <main className={"h-screen w-full"}>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
              <MeetingSetup meetingSetup={setIsSetupComplete} />
          ) : (
              <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting