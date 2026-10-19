import { usePrincipal } from "../../hooks/useResources";
import { principalDefaults } from "../../data/data";
import Loading from "../../components/Loading";

const PrincipalProfile = () => {
  const { data: principal, loading } = usePrincipal();
  const paragraphs = principal.message
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());

  if (loading) return <Loading title="Principal Message" />;

  return (
    <div className="bg-white">
      <div className="site-container py-10 md:py-14">
        {/* Message */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
            {/* Photo, stretches to the height of the message */}
            <figure className="lg:col-span-5 relative rounded-lg overflow-hidden min-h-[360px] h-[60vh] lg:h-auto">
              <img
                src={principal.image}
                alt="Principal, Thapar Polytechnic College"
                onError={(event) => {
                  // The saved photo is missing: show the built-in one instead.
                  if (
                    !event.currentTarget.src.endsWith(principalDefaults.image)
                  ) {
                    event.currentTarget.src = principalDefaults.image;
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </figure>

            <div className="lg:col-span-7">
              <h1 className="page-title mb-3">
                Message from the <span className="text-black">Principal</span>
              </h1>
              <p className="text-lg italic text-gray-900 mb-6">
                - {principal.name}
              </p>
              <div className="text-gray-700 leading-7 space-y-4">
                {paragraphs.map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
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
            {principal.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 shadow-md hover:-translate-y-1 transition-transform duration-300"
              >
                <h3 className="card-title mb-4">{highlight.title}</h3>
                <ul className="space-y-2 px-2">
                  {(highlight.points || []).map((point, idx) => (
                    <li key={idx} className="list-disc text-gray-700">
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
