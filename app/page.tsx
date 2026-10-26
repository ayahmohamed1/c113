import giftData from '@/lib/giftData'
import GiftClient from '@/components/GiftClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'عيد ميلاد سعيد يا هشام! 🎂',
  description: 'رسالة عيد ميلاد خاصة ومميزة لهشام',
}

export default function Home() {
  const data = giftData.hisham || giftData.ahmed || giftData.aya
  return <GiftClient data={data} />
}
