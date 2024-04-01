
import {useCall, useCallStateHooks} from '@stream-io/video-react-sdk'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'

const EndCallButton = () => {
  const router = useRouter()
  const call = useCall()
  const {useLocalParticipant} = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id
  if (!isMeetingOwner) return null

  return (
    <Button onClick={async () => {
      await call?.endCall()
      router.push("/")
    }} className={"bg-red-500"}>
      End Call for everyone
    </Button>
  )
}

export default EndCallButton