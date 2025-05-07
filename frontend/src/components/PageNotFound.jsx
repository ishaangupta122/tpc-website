import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

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
      <div className="flex justify-center items-center container mx-auto h-[80vh] py-16 max-h-[500px]">
        <div className="flex flex-col items-center justify-center w-full md:w-[70%] border-2 border-red-600 px-4 py-14 mx-6">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </p>
          <p className="text-gray-600 mb-6 w-[90%] text-center">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="px-6 py-2 text-white bg-gradient-to-b from-emerald-800 to-emerald-950 border-b hover:from-emerald-700 hover:to-emerald-900 rounded-lg transition duration-300">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
