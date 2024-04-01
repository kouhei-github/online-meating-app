"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {useState} from 'react'

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]
const Recordings = () => {
  const [goal, setGoal] = useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const [count, setCount] = useState(1)
  return (
      <section className={"flex size-full flex-col gap-10 text-white"}>
        <h1 className={"text-3xl font-bold"}>Recordings</h1>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent className={"text-white"}>
            <div className="mx-auto w-full max-w-sm">
              <h2
                  className={cn("text-pink-400 bg-white", {
                    "text-black font-extrabold px-3": count % 5 === 0
                  })}
              >
                COUNT: {count}
              </h2>
              <DrawerFooter>
                <Button onClick={() => setCount(count + 1)}>Submit</Button>

                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </section>
  )
}

export default Recordings