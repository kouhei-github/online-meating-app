import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '@/components/MobileNav'
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'

const Navbar = () => {
  return (
      <nav className={"flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10"}>
        <Link href={"/"} className={"flex items-center gap-1"}>
          <Image src={"/icons/logo.svg"} alt={"Zoom logo"} width={32} height={32} className={"max-sm:size-10"} />
          <p className={"text-[26px] font-extrabold text-white max-sm:hidden"}>
            Kohei MTG Tool
          </p>
        </Link>
        <div className={"flex-between gap-5"}>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <UserButton />
          </SignedOut>
          <MobileNav />
        </div>
      </nav>
  )
}

export default Navbar