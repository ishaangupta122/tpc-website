import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import { topbarLinks } from "../data/data";

const Topbar = () => {
  return (
    <div className="hidden lg:block bg-gradient-to-b from-emerald-800 to-emerald-950 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center lg:space-x-3 xl:space-x-4 text-xs xl:uppercase lg:tracking-tighter xl:tracking-wide">
            {/* Hardcoded Admission Enquiry */}
            <Link
              to="/contact"
              className="flex flex-col justify-center items-center text-yellow-300 hover:text-yellow-400 transition-colors blink-animation">
              <span className="flex items-center justify-center">
                <Smartphone className="h-4" />
                Admission Enquiry :
              </span>
              <span>+91 75088-55997</span>
            </Link>

            {/* Dynamic Links */}
            {topbarLinks.map(({ id, name, link, external }) =>
              external ? (
                <Link
                  key={id}
                  to={link}
                  target="_blank"
                  className={
                    "text-yellow-300 hover:text-yellow-400 transition-colors blink-animation"
                  }>
                  {name}
                </Link>
              ) : (
                <Link
                  key={id}
                  to={link}
                  className={
                    "text-white hover:text-emerald-100 transition-colors"
                  }>
                  {name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
