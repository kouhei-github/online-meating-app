import CallList from '@/components/CallList'

const Upcoming = () => {
  return (
      <section className={"flex size-full flex-col gap-10 text-white"}>
        <CallList type={"upcoming"} />
      </section>
  )
}

export default Upcoming