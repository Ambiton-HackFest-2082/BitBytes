import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-image.png";
import Feature from "./Feature.jsx";
import Video from "./VideoDisplay.jsx";
import Testimonial from "./Testimonial.jsx";
import FAQ from "./Faq.jsx";

export default function Hero() {
    return (
        <div className="bg-blue-200 mb-12 ">
            {/* Hero Split Section */}
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-5 bg-blue-200">
                {/* Left: Text Section */}
                <div className="md:w-1/2 w-full text-center md:text-left mb-2px md:mb-0">
                    <div className="inline-block bg-green-100 text-gray-800 px-4 py-2 rounded-md shadow mb-4 font-semibold text-sm">
                        Bridging the gap between students and teachers with seamless collaboration.
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to SikshyaSetu
                    </h1>

                    <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0 mb-6">
                        Connecting students and teachers on one collaborative platform. Share
                        knowledge, ask questions, and build the future of learning — together.
                    </p>

                    {/* Get Started Button */}
                    <Link
                        to="/auth/register"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Right: Image Section */}
                <img
                    src={heroImage}
                    alt="Hero"
                    className="rounded-lg shadow-lg w-96 md:w-[500px] h-auto"
                />
            </div>

            {/* Feature Section Below */}
            <div className="bg-blue-200 rounded-lg p-6 mt-8 w-full max-w-4xl mx-auto mb-4">
                <Feature />
            </div>
            <div className="mb-4">
                <Video
                    title="Watch How SikshyaSetu Works"
                    videoId="4ZlI0f_iJfE"
                />
            </div>
            <div className="bg-blue-200 rounded-lg p-6 mt-8 w-full max-w-4xl mx-auto mb-4">
                <Testimonial />
            </div>
            <div className=" mb-4">
                <FAQ />
                </div>

        </div>
    );
}
