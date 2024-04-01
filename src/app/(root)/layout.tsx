import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Toaster } from "@/components/ui/toaster"
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: "KOHEI MTG",
  description: "Video Calling App",
  icons: {
    icon: "/icons/logo.svg"
  }
};


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
