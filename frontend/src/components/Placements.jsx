import { useEffect, useRef, useState } from "react";
import { companies } from "../data/data";

const PlacementCarousel = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate companies for seamless loop
  const allCompanies = [...companies, ...companies];

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Calculate the duration based on the number of items
    const animationDuration = companies.length * 5; // 5 seconds per item

    // Add animation styles
    slider.style.cssText = `
      animation: scroll ${animationDuration}s linear infinite;
      animation-play-state: running;
    `;

    // Pause animation on hover
    if (isHovered) {
      slider.style.animationPlayState = "paused";
    }

    return () => {
      if (slider) {
        slider.style.animation = "none";
      }
    };
  }, [companies.length, isHovered]);

  return (
    <div id="placements" className="">
      <div className="w-full bg-[#e5f7f8] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-emerald-900 mb-4 uppercase">
              Recruiting <span className="text-black">Partners</span>
            </h2>
            <div className="w-28 h-1 bg-black mx-auto rounded-lg" />
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <style>{`
						@keyframes scroll {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(-50%);
							}
						}
					`}</style>

            <div className="overflow-hidden">
              <div ref={scrollRef} className="flex gap-4 w-fit py-2">
                {allCompanies.map((company, index) => (
                  <div
                    key={`${company.id}-${index}`}
                    className="flex-none w-48 p-4 bg-white rounded-lg shadow-sm transition-transform hover:scale-105 duration-300">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-24 object-contain"
                    />
                    <p className="mt-2 text-center font-bold text-emerald-800 text-sm">
                      {company.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementCarousel;
