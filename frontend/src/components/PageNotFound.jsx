import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import { MoveRight } from "lucide-react";

const PageNotFound = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "404 Not Found", href: "/" },
  ];
  return (
    <>
      <HeroSection
        imageUrl="./rec_gate.jpg"
        title="404 Not Found"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center items-center container mx-auto h-[80vh] my-20 max-h-[500px]">
        <div className="flex flex-col items-center justify-center w-full md:w-[70%] border-4 border-red-500 px-4 py-24 mx-6 rounded-md bg-red-100">
          <h1 className="text-4xl lg:text-6xl font-bold text-red-500 mb-4 uppercase">
            404
          </h1>
          <p className="text-2xl lg:text-4xl font-bold text-red-500 mb-4 uppercase">
            Page Not Found
          </p>
          <p className="lg:text-lg text-red-500 font-semibold mb-10 w-[90%] text-center uppercase">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="px-6 py-2 text-white bg-gradient-to-b from-emerald-800 to-emerald-950 border-b hover:from-emerald-700 hover:to-emerald-900 rounded-lg transition duration-300">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
