import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import EarlyLife from '@/components/EarlyLife';
import Discography from '@/components/Discography';
import ArtisticIdentity from '@/components/ArtisticIdentity';
import Closing from '@/components/Closing';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] overflow-x-hidden">
      <Navigation />
      <Hero />
      <EarlyLife />
      <Discography />
      <ArtisticIdentity />
      <Closing />
    </main>
  );
}