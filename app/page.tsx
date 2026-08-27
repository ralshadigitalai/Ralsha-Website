import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Audience from '@/components/Audience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';

export default function Home() {
  return (
    <ScrollRevealProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Audience />
        <Contact />
      </main>
      <Footer />
    </ScrollRevealProvider>
  );
}
