import { Quote } from "lucide-react";
import { testimonials } from "../data/data";

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#FFFFFF] py-24 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold uppercase text-emerald-800 mb-4">
            Testimonials
          </h2>
          <div className="w-28 h-1 bg-[#FDB714] mx-auto rounded-full"></div>
        </div>

        <div className="relative flex items-center">
          {/* Cards Container */}
          <div
            className="flex w-full overflow-x-scroll scroll-smooth py-6 lg:mx-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            <div className="flex gap-2 px-2 transition-transform duration-500 ease-out">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className=" max-w-[400px] w-[21rem] md:w-[20rem] lg:w-[30rem] ">
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col justify-between">
                    <div>
                      <Quote className="w-8 h-8 text-emerald-800 mb-4" />
                      <blockquote className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-300">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 ">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm font-semibold text-emerald-800">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
