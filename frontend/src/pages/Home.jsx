import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UpcomingEvents from "../components/UpcomingEvents";
import Categories from "../components/Categories";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <Categories />
      <Features />
      <HowItWorks />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;