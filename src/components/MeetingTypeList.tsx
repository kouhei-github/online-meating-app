"use client"
import HomeCard from '@/components/HomeCard'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import MeetingModel from '@/components/MeetingModel'
import {useUser} from '@clerk/nextjs'
import {Call, useStreamVideoClient} from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<"isScheduleMeeting"|"isJoiningMeeting"|"isInstantMeeting"|undefined>()

  const { user} = useUser()
  const client = useStreamVideoClient()

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  })

  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if(!user || !client) return
    try {
      if (!values.dateTime) return toast({title: "Sprease select a date and time"})

      const id = crypto.randomUUID()
      const call = client.call("default", id)
      if (!call) throw new Error("fauled to call")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant meeting"
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      setCallDetails(call)

      toast({title: "Meeting Created"})

      if(!values.description) {
        router.push(`/meeting/${call.id}`)
      }

    } catch (e) {
      toast({title: "Failed to create meeting"})
    }
  }


  return (
      <section className={"grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"}>
        <HomeCard
            image={"/icons/add-meeting.svg"}
            title={"New Meeting"}
            description={"Start an Instant meeting"}
            handleClick={() => setMeetingState("isInstantMeeting")}
            className={"bg-orange-1"}
        />
        <HomeCard
            image={"/icons/schedule.svg"}
            title={"Schedule Meeting"}
            description={"Plan Your meeting"}
            handleClick={() => setMeetingState("isScheduleMeeting")}
            className={"bg-blue-1"}
        />
        <HomeCard
            image={"/icons/recordings.svg"}
            title={"View Recordings"}
            description={"Check out your recordings"}
            handleClick={() => setMeetingState("isJoiningMeeting")}
            className={"bg-purple-1"}
        />
        <HomeCard
            image={"/icons/join-meeting.svg"}
            title={"Join Meeting"}
            description={"via invitation link"}
            handleClick={() => setMeetingState("isJoiningMeeting")}
            className={"bg-yellow-1"}
        />

        <MeetingModel
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          title={"Start an Instant Meeting"}
          className={"text-center"}
          buttonText={"Start Meeting"}
          handleClick={() => createMeeting()}
        />


      </section>
  )
}

export default MeetingTypeList