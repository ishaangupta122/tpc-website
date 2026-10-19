import HeroSection from "../../components/HeroSection";

// Quick facts, all taken from the introduction text.
const facts = [
  ["Established", "1956, by Late Lala Karam Chand Thapar"],
  ["Campus", "Thapar Technology Campus, Patiala"],
  [
    "Affiliation",
    "Punjab State Board of Technical Education and Industrial Training, Chandigarh",
  ],
  ["Recognition", "Best Polytechnic in the Northern Region (1999-2000, 2005-06)"],
];

const mission = [
  "Advance the cause of technical education through innovative teaching and learning methodologies.",
  "Produce globally competent engineers with entrepreneurial skills and strong ethical values.",
  "Promote rural development and community service through skill development programs and training initiatives.",
  "Collaborate with industry partners to address contemporary technical challenges and societal needs.",
];

const AboutPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <HeroSection
        imageUrl={"/girls_hostel.jpg"}
        title={"About Us"}
        breadcrumbs={breadcrumbs}
      />
      <div className="bg-white">
        <div className="site-container py-10 md:py-14 flex flex-col gap-10 md:gap-14">
          {/* Introduction */}
          <section>
            <h1 className="page-title mb-6">
              About <span className="text-black">Us</span>
            </h1>
            <p className="text-lg text-gray-900 leading-8 max-w-4xl mb-8">
              Established in 1956 by the visionary Late Lala Karam Chand Thapar,
              Thapar Polytechnic College (TPC) has a rich legacy of excellence
              in technical education.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-7 space-y-4 text-gray-700 leading-7">
                <p>
                  As part of the Thapar Technology Campus, alongside the Thapar
                  Institute of Engineering and Technology and the Thapar Centre
                  for Industrial Research &amp; Development, TPC has played a
                  pivotal role in shaping future technocrats. With affiliations
                  to the Punjab State Board of Technical Education and
                  Industrial Training, Chandigarh, and support as a privately
                  managed, government-aided institution, TPC offers 3-year
                  diploma programs in Civil Engineering, Electrical Engineering,
                  Mechanical Engineering, Computer Engineering, and
                  Architectural Assistantship.
                </p>
                <p>
                  Boasting an annual intake of 360 students, TPC has been
                  recognized as the Best Polytechnic in the Northern Region
                  twice, in 1999-2000 and 2005-06, underscoring its commitment
                  to quality education and innovation.
                </p>
              </div>

              <aside className="lg:col-span-5" aria-label="Quick facts">
                <dl>
                  {facts.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start gap-6 py-3 border-b border-gray-200 first:pt-0 last:border-b-0 text-sm">
                      <dt className="w-32 shrink-0 font-semibold text-gray-900">
                        {label}
                      </dt>
                      <dd className="text-gray-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </section>

          {/* Mission and vision */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <div className="rounded-lg overflow-hidden min-h-[320px]">
              <img
                src="/rec_gate.jpg"
                alt="Thapar Polytechnic College Entrance"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-center gap-10">
              <div className="border-l-4 border-emerald-800 pl-6">
                <h2 className="section-title mb-4">Our Mission</h2>
                <ul className="list-disc ml-5 space-y-3 text-gray-700 leading-7 marker:text-emerald-800">
                  {mission.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-[#FDB714] pl-6">
                <h2 className="section-title mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-7">
                  To be a globally recognized leader in technical education,
                  fostering innovation, skill development, and societal progress
                  to meet the aspirations of future generations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
