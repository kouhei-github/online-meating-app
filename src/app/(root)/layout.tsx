"use client"
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Toaster } from "@/components/ui/toaster"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <StreamVideoProvider>
        {children}
        <Toaster />
      </StreamVideoProvider>
    </main>
  );
}
