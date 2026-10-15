import { principalKeyHighlights, principalContactInfo } from "../../data/data";

const PrincipalProfile = () => {
  return (
    <div className="bg-white">
      <div className="site-container py-10 md:py-14">
        {/* Message */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
            {/* Photo, stretches to the height of the message */}
            <figure className="lg:col-span-5 relative rounded-lg overflow-hidden min-h-[360px] h-[60vh] lg:h-auto">
              <img
                src={principalContactInfo.image}
                alt="Principal, Thapar Polytechnic College"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </figure>

            <div className="lg:col-span-7">
              <h1 className="page-title mb-3">
                Message from the <span className="text-black">Principal</span>
              </h1>
              <p className="text-lg italic text-gray-900 mb-6">
                - {principalContactInfo.name}
              </p>
              <div className="text-gray-700 leading-7 space-y-4">
              <p>
                India today is an emerging economic power. Since the economic liberalization, industry has seen significant growth and the country has successfully leveraged its engineering skills to build a formidable manufacturing sector. The continued improvement in industrial infrastructure coupled with favourable policies and thrust from the Government are expected to help sustain the growth momentum in manufacturing.
              </p>
              <p>
                Diploma engineers with practical and skills-oriented training along with supervisory skills have a major role to ensure quality and volume of production in manufacturing sector. Thapar Polytechnic College Patiala is one of the oldest and most reputed Polytechnics of Punjab imparting technical education upto Diploma in seven branches of Engineering.
              </p>
              <p>
                Established since 1956 and co-located with the renowned Thapar University in a lush green campus, the College offers a very conducive environment for learning and overall growth. We aim to provide students with industry or job related engineering knowledge, scientific skills, sound knowledge of English to communicate in the field and ability to apply problem solving techniques.
              </p>
              <p>
                We have quality infrastructure with fully equipped workshops, labs, library, excellent sports facilities, class rooms and hostels in green and clean surroundings providing a healthy academic environment both for students and faculty. Our well qualified and dedicated faculty is focused on imparting high quality education and mentoring for the students for them to become successful technocrats and worthy citizens of our country.
              </p>
              <p>
                I am looking forward for a purposeful participation and whole hearted co-operation from students and teachers in building this institution stronger.
              </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Highlights */}
      <section className="pb-14 md:pb-20">
        <div className="site-container">
          <h2 className="section-title text-center mb-10">
            Key <span className="text-black">Highlights</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principalKeyHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
                <h3 className="card-title mb-4">{highlight.title}</h3>
                <ul className="space-y-2 px-2">
                  {highlight.points.map((point, idx) => (
                    <li key={idx} type="disc" className="text-gray-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrincipalProfile;
