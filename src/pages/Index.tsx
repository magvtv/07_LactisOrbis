
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FlavorShowcase from '@/components/FlavorShowcase';
import StoreLocator from '@/components/StoreLocator';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FlavorShowcase />
        <StoreLocator />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
