import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePrincipal } from "../hooks/useResources";
import { principalDefaults } from "../data/data";

const PrincipalCard = () => {
  const { data: principal, loading } = usePrincipal();
  // The home card shows the first paragraph of the message only.
  const firstParagraph = principal.message.split(/\n\s*\n/)[0];

  if (loading) return null;

  return (
    <section id="principal-message" className="bg-white overflow-hidden py-10">
      {/* Same width and gray surface as the other home page panels */}
      <div className="site-container my-10">
        <div className="w-full flex lg:flex-row flex-col lg:gap-14 gap-8 p-4 md:p-6 bg-gray-50 border border-gray-200 items-center rounded-2xl">
          <div className="bg-white w-full lg:w-auto lg:shrink-0 h-60 rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden p-2 shadow-md shadow-black/30">
            <img
              src={principal.image}
              alt={`${principal.name}, Principal`}
              className="h-full w-full object-cover lg:aspect-[2/1] rounded-tr-[4rem] rounded-bl-[4rem] shadow-md shadow-black/30"
              loading="lazy"
              onError={(event) => {
                // The saved photo is missing: show the built-in one instead.
                if (
                  !event.currentTarget.src.endsWith(principalDefaults.image)
                ) {
                  event.currentTarget.src = principalDefaults.image;
                }
              }}
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-2">
            <h2 className="section-title after:hidden">
              <span className="text-emerald-800">Principal&apos;s </span>
              <span className="text-black">Message</span>
            </h2>
            <p className="text-base font-normal">{principal.name}</p>
            <p className="line-clamp-4 text-sm font-normal text-gray-600">
              {firstParagraph}
            </p>
            <Link
              to="/principal"
              className="text-emerald-800 w-fit flex items-center gap-1 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              Read More
              <MoveRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalCard;
