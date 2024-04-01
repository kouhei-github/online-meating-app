import {DeviceSettings, useCall, VideoPreview} from '@stream-io/video-react-sdk'
import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'

const MeetingSetup = (props: {meetingSetup: (v: boolean) => void}) => {
  const [isMicCamtoggleOn, setIsMicCamtpggleOn] = useState(false)

  const call = useCall()

  if(!call) throw new Error("call must be used within StreamCall component")

  useEffect( () => {
    if(isMicCamtoggleOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamtoggleOn, call?.camera, call?.microphone] );
  return (
    <div className={"flex h-screen w-full flex-col items-center justify-center gap-3 text-white"}>
      <h1 className={"text-2xl font-bold"}>Setup</h1>
      <VideoPreview />
      <div className={"flex-center h-16 gap-3"}>
        <label htmlFor="" className={"flex-center gap-2 font-medium"}>
          <input type="checkbox" checked={isMicCamtoggleOn} onChange={(e) => setIsMicCamtpggleOn(e.target.checked)}/>
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button onClick={() => {
        call?.join()
        props.meetingSetup(true)
      }} className={"rounded-md bg-green-500 px-4 py-2.5"}>
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup