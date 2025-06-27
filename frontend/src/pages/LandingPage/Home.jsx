import Hero from "../../components/Landingpage/Hero";
import FAQ from "@/components/Landingpage/Faq";
import Feature from "@/components/Landingpage/Feature";
import VideoDisplay from "@/components/Landingpage/VideoDisplay";
import Testimonial from "@/components/Landingpage/Testimonial";
import Contact from "../LandingPage/Contact"
import About from "../LandingPage/About"
const Home = () => {
  return (
    <>
    <Hero />
    <About />
    <Feature />
    <VideoDisplay />
    <Testimonial />
    <FAQ />
    <Contact />
     
      
    </>
  );
};

export default Home;
