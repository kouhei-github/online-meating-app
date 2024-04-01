"use client"
import HomeCard from '@/components/HomeCard'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import MeetingModel from '@/components/MeetingModel'

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<"isScheduleMeeting"|"isJoiningMeeting"|"isInstantMeeting"|undefined>("isInstantMeeting")

  const createMeeting = () => {}
  return (
      <section className={"grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"}>
        <HomeCard
            image={"/icons/add-meeting.svg"}
            title={"New Meeting"}
            description={"Start an Instant meeting"}
            handleClick={() => setMeetingState("isJoiningMeeting")}
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

        />


      </section>
  )
}

export default MeetingTypeList