import { Link } from "react-router-dom";
import { InstagramEmbed } from "react-social-media-embed";

const InstaEmbed = () => {
  return (
    <div className="mx-auto w-full lg:w-[60%] lg:max-w-[410px]">
      <div className="rounded-lg shadow-lg bg-gradient-to-tl from-emerald-700 to-emerald-950 px-5 pt-4 pb-2 w-full">
        <div className="mb-5 flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-medium text-emerald-50 ">
            Instagram Updates
          </h3>
          <Link
            to="https://www.instagram.com/tpc.patiala"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50 rounded-2xl font-medium px-3 py-1 text-emerald-800 hover:bg-emerald-100 text-sm">
            Follow Us
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full sm:max-w-[230px] md:max-w-full overflow-hidden rounded-md">
            <InstagramEmbed
              url="https://www.instagram.com/tpc.patiala"
              className="w-full transform transition-transform duration-300 hover:scale-102"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaEmbed;
