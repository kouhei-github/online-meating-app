import {useState} from 'react'
import {
  CallControls, CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout, useCall, useCallStateHooks
} from '@stream-io/video-react-sdk'
import {cn} from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LayoutList, User, Users} from 'lucide-react'
import {useSearchParams} from 'next/navigation'
import EndCallButton from '@/components/EndCallButton'
import Loader from '@/components/Loader'


type CallLayoutType= "grid" | "speaker-left" | "speaker-right"
const MeetingRoom = () => {
  const route = useSearchParams()
  const isPersonalRoom = !!route.get("personal")
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

  const {useCallCallingState} = useCallStateHooks()

  const callingState = useCallCallingState()

  if(callingState !== CallingState.JOINED) return <Loader />

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

      <div className={"fixed bottom-0 flex-center w-full gap-5 flex-wrap"}>
        <CallControls />
        <DropdownMenu>
          <div className={"flex items-center"}>
            <DropdownMenuTrigger className={"cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"}>
              <LayoutList size={20}/>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className={"border-dark-1 bg-dark-1 text-white"}>
            {["Grid", "Speaker-Left", "Speaker-Right"].map( (item, key) => {
              // const zero = key % 2 === 0
              return (
                  <div key={key}>
                    <DropdownMenuItem
                        className={"cursor-pointer"}
                        onClick={() => {
                          setLayout( item.toLowerCase() as CallLayoutType )
                        }}
                    >
                      {item}
                    </DropdownMenuItem>
                    {/*{zero && (*/}
                    {/*    <div>test</div>*/}
                    {/*)}*/}
                  </div>
              )
            } )}
            <DropdownMenuSeparator className={"border-dark-1"}/>
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>

        <button onClick={() => {
          setShowParticipants( (prev) => !prev )
        }}>
          <div className={"cursor-pointer rounded-2xl bg-[#199232d] px-4 hover:bg-[$4c535b]"}>
            <Users size={20} className={"text-white"}/>
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>

    </section>
  )
}

export default MeetingRoom