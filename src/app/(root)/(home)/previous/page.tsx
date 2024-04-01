import CallList from '@/components/CallList'

const Previous = () => {
  return (
    <section className={"flex size-full flex-col gap-10 text-white"}>
      <CallList type={"ended"} />
    </section>
  )
}

export default Previous