import { MapPin } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { collegeContact } from "../data/data";

const quickLinks = [
  { title: "Admissions", link: "/admission" },
  { title: "Principal", link: "/principal" },
  { title: "Faculty", link: "/faculty" },
  { title: "Contact", link: "/contact" },
];

const resourceLinks = [
  { title: "About Us", link: "/about" },
  { title: "Hostel", link: "/hostel" },
  { title: "Library", link: "/library" },
  { title: "Gallery", link: "/gallery" },
];

const socialLinks = [
  {
    icon: <FaFacebook className="w-6 h-6" />,
    link: "https://www.facebook.com/profile.php?id=61550314207532&mibextid=ZbWKwL",
    label: "Facebook",
  },
  {
    icon: <FaInstagram className="w-6 h-6" />,
    link: "https://www.instagram.com/tpc.patiala",
    label: "Instagram",
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    link: "https://www.linkedin.com/school/thapar-polytechnic-college/",
    label: "LinkedIn",
  },
  {
    icon: <FaTwitter className="w-6 h-6" />,
    link: "https://x.com/Tpcpatiala",
    label: "Twitter",
  },
];

const linkClass =
  "text-gray-300 hover:text-white transition-colors duration-300";

const Footer = () => {
  const { name, addressLines, phones, email } = collegeContact;

  return (
    <footer className="bg-black text-white ">
      <div className="site-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center justify-start gap-2 flex-wrap ">
              <Link to="/">
                <img src="/tpc-logo.png" alt="College Logo" className="h-16" />
              </Link>
              <h1 className="text-sm font-bold">{name}</h1>
            </div>
            <p className="mt-4 text-xs text-gray-300">
              Empowering minds, shaping futures, and fostering excellence in
              education since 1956.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="text-left lg:text-center ">
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ title, link }) => (
                <li key={link}>
                  <Link to={link} className={linkClass}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources" className="text-left lg:text-center">
            <h2 className="font-semibold mb-4">Resources</h2>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map(({ title, link }) => (
                <li key={link}>
                  <Link to={link} className={linkClass}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="lg:flex flex-col items-center justify-start">
            <h2 className="font-semibold mb-4">Contact Us</h2>
            <address className="not-italic text-gray-300 space-y-2 text-sm">
              <div className="flex justify-start gap-2">
                <MapPin className="mt-1 shrink-0" />
                <div className="flex flex-col">
                  <span>{name},</span>
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                <FaPhone className="shrink-0" />
                {phones.map(({ display, tel }, index) => (
                  <span key={tel}>
                    <a href={`tel:${tel}`}>
                      {index === 0 ? "+91 " : ""}
                      {display}
                    </a>
                    {index < phones.length - 1 && ","}
                  </span>
                ))}
              </div>
              <a
                href={`mailto:${email}`}
                className="flex justify-start items-center gap-2">
                <FaEnvelope className="shrink-0" /> {email}
              </a>
            </address>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map(({ icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-200 hover:text-white transition-colors duration-300">
                  {icon}
                </a>
              ))}
            </div>
            <div className="text-gray-200 text-sm text-center">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
