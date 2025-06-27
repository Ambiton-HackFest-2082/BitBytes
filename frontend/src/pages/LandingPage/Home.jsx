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
      <div id="hero-section">
        <Hero />
      </div>
      <div id="about-section">
        <About />
      </div>
      <div id="feature-section">
        <Feature />
      </div>
        <VideoDisplay videoId="vrFuQOsQAx4" />
      <div id="testimonial-section">
        <Testimonial />
      </div>
      <div id="faq-section">
        <FAQ />
      </div>
      <div id="contact-section">
        <Contact />
      </div>


    </>
  );
};

export default Home;
