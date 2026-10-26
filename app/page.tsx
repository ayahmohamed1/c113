import giftData from '@/lib/giftData'
import GiftClient from '@/components/GiftClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Happy Birthday Hisham! 🎂',
  description: 'A special birthday message for Hisham',
}

export default function Home() {
  const data = giftData.hisham || giftData.ahmed || giftData.aya
  return <GiftClient data={data} />
}
