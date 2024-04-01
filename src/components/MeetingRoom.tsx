import {useState} from 'react'
import {CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout} from '@stream-io/video-react-sdk'
import {cn} from '@/lib/utils'

type CallLayoutType= "grid" | "speaker-left" | "speaker-right"
const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"left"} />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"right"} />
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />
    }
  }

  const [showParticipants, setShowParticipants] = useState(false)

  return (
      <section className={"relative h-screen w-full overflow-hidden pt-4 text-white"}>
        <div className={"flex-center relative size-full"}>
          <div className={"flex size-full max-w-[1000px] items-center"}>
            <CallLayout />
          </div>
         <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {"show-block": showParticipants})}>
           <CallParticipantsList onClose={() => setShowParticipants(false)} />
         </div>
        </div>

        <div className={"fixed bottom-0 flex-center w-full gap-5"}>
          <CallControls />
        </div>

      </section>
  )
}

export default MeetingRoom