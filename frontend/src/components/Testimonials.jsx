import { Quote } from "lucide-react";
import { testimonials } from "../data/data";

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#FFFFFF] py-24">
      <div className="site-container">
        <div className="text-center mb-12">
          <h2 className="section-title with-rule text-center mb-6">
            Testimonials
          </h2>
        </div>

        <div className="relative flex items-center">
          {/* Cards Container */}
          <div
            className="flex w-full overflow-x-scroll scroll-smooth px-2 pb-10 pt-4 lg:mx-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            <div className="flex gap-6 px-2 transition-transform duration-500 ease-out">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-[21rem] max-w-[400px] shrink-0 md:w-[20rem] lg:w-[24rem]">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                    <div>
                      <Quote className="w-8 h-8 text-emerald-800 mb-4" />
                      <blockquote className="mb-6 text-base leading-relaxed text-gray-600">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-300">
                      <div className="flex items-center">
                        <div className="mr-4 h-16 w-16 shrink-0 overflow-hidden rounded-full">
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
