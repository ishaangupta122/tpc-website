import { Mail, Phone, Clock } from "lucide-react";
import { principalKeyHighlights, principalContactInfo } from "../../data/data";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const PrincipalProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image and Contact Info */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="h-[80vh] max-h-[600px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={principalContactInfo.image}
                alt="Principal, Thapar Polytechnic College"
                className="w-full rounded-lg shadow-lg h-full object-cover"
              />
            </div>
            {/* Contact Info - Hidden on mobile, visible on lg screens */}
            <div className="hidden lg:block bg-yellow-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-medium mb-4 text-yellow-700">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="text-yellow-700" />
                  <Link
                    target="_blank"
                    to={`mailto:${principalContactInfo.mail}`}
                    className="underline">
                    {principalContactInfo.mail}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-yellow-700" />
                  <span>Office : +{principalContactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-yellow-700" />
                  <span>Monday-Friday : {principalContactInfo.timmings}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Link
                  to={principalContactInfo.instagramURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaInstagram size={24} />
                </Link>
                <Link
                  to={principalContactInfo.twitterURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaTwitter size={24} />
                </Link>
                <Link
                  to={principalContactInfo.linkedinURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaLinkedin size={24} />
                </Link>
                <Link
                  to={principalContactInfo.facebookURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaFacebook size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Message and Contact Info for mobile */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold mb-4 text-emerald-900">
              Message from the Principal
            </h2>
            <h2 className="text-lg font-normal mb-4 text-black italic">
              - {principalContactInfo.name}
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                India today is an emerging economic power. Since the economic
                liberalization, industry has seen significant growth and the
                country has successfully leveraged its engineering skills to
                build a formidable manufacturing sector. The continued
                improvement in industrial infrastructure coupled with favourable
                policies and thrust from the Government are expected to help
                sustain the growth momentum in manufacturing.
              </p>
              <p>
                Diploma engineers with practical and skills-oriented training
                along with supervisory skills have a major role to ensure
                quality and volume of production in manufacturing sector. Thapar
                Polytechnic College Patiala is one of the oldest and most
                reputed Polytechnics of Punjab imparting technical education
                upto Diploma in seven branches of Engineering.
              </p>
              <p>
                Established since 1956 and co-located with the renowned Thapar
                University in a lush green campus, the College offers a very
                conducive environment for learning and overall growth. We aim to
                provide students with industry or job related engineering
                knowledge, scientific skills, sound knowledge of English to
                communicate in the field and ability to apply problem solving
                techniques.
              </p>
              <p>
                We have quality infrastructure with fully equipped workshops,
                labs, library, excellent sports facilities, class rooms and
                hostels in green and clean surroundings providing a healthy
                academic environment both for students and faculty. Our well
                qualified and dedicated faculty is focused on imparting high
                quality education and mentoring for the students for them to
                become successful technocrats and worthy citizens of our
                country.
              </p>
              <p>
                I am looking forward for a purposeful participation and whole
                hearted co-operation from students and teachers in building this
                institution stronger.
              </p>
            </div>

            {/* Contact Info - Visible only on mobile/tablet */}
            <div className="lg:hidden bg-yellow-50 rounded-lg p-6 my-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-yellow-700">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="text-yellow-700" />
                  <Link
                    to={`mailto:${principalContactInfo.mail}`}
                    className="underline">
                    {principalContactInfo.mail}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-yellow-700" />
                  <span>Office : +{principalContactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-yellow-700" />
                  <span>Monday-Friday : {principalContactInfo.timmings}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Link
                  to={principalContactInfo.instagramURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaInstagram size={24} />
                </Link>
                <Link
                  to={principalContactInfo.twitterURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaTwitter size={24} />
                </Link>
                <Link
                  to={principalContactInfo.linkedinURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaLinkedin size={24} />
                </Link>
                <Link
                  to={principalContactInfo.facebookURL}
                  target="_blank"
                  className="text-emerald-900 hover:text-emerald-800">
                  <FaFacebook size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold uppercase text-emerald-900 mb-4 text-center">
            Key
            <span className="text-black"> Highlights</span>
          </h2>
          <div className="w-28 h-1 bg-[#FDB714] mx-auto rounded-full mb-10"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {principalKeyHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-emerald-50 border from-emerald-50 to-emerald-100 rounded-lg p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl font-medium mb-4 ">{highlight.title}</h3>
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
      </div>
    </div>
  );
};

export default PrincipalProfile;
