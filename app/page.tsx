import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { WhoItsFor } from '@/components/WhoItsFor';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <WhoItsFor />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
