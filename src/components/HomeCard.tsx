import Image from 'next/image'
import {cn} from '@/lib/utils'

const HomeCard = ({image, description, title, className, handleClick}:{image: string, title: string, description: string, readonly className: string, readonly handleClick: () => void}) => {
  return (
      <div
          className={cn(`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`, className)}
          onClick={handleClick}
      >
        <div className={"flex items-center justify-center glassmorphism size-12 rounded-[10px]"}>
          <Image src={image} alt={"meeting"} width={27} height={27}/>
        </div>
        <div className={"flex flex-col gap-2"}>
          <h1 className={"text-2xl font-bold"}>{title}</h1>
          <p className={"text-lg font-normal"}>{description}</p>
        </div>
      </div>
  )
}

export default HomeCard