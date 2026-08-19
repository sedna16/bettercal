import Hero from '../components/sections/Hero';
import PopularServicesSection from '../components/home/PopularServicesSection';
import StatisticsSection from '../components/home/StatisticsSection';
import MapSection from '../components/home/MapSection';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Caloocan City, Metro Manila"
        description="Official website of your local government. Access government services, information, and resources."
        keywords="government, local government, services, public services, civic services"
      />
      <main className="flex-grow">
        <Hero />
        <PopularServicesSection />
        <StatisticsSection />
        <MapSection />
        <ServicesSection />
        <GovernmentActivitySection />
      </main>
    </>
  );
};

export default Home;
