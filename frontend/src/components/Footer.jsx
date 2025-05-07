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

const Footer = () => {
  const quickLinks = [
    { title: "Admissions", link: "/admission" },
    { title: "Principal", link: "/principal" },
    { title: "Faculty", link: "/faculty" },
    { title: "Contact", link: "/contact" },
  ];

  const researchLinks = [
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

  return (
    <footer className="bg-black text-white ">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center justify-start gap-2 flex-wrap ">
              <a href="/">
                <img src="/tpc-logo.png" alt="College Logo" className="h-16" />
              </a>
              <h1 className="text-sm font-bold">Thapar Polytechnic College</h1>
            </div>
            <p className="mt-4 text-xs text-gray-300">
              Empowering minds, shaping futures, and fostering excellence in
              education since 1956.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left lg:text-center ">
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left lg:text-center">
            <h2 className="font-semibold mb-4">Resources</h2>
            <ul className="space-y-2 text-sm">
              {researchLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:flex flex-col items-center justify-start">
            <h2 className="font-semibold mb-4">Contact Us</h2>
            <div className="text-gray-300 space-y-2 text-sm">
              <div className="flex justify-start gap-2">
                <MapPin className="mt-1" />
                <div className="flex flex-col">
                  <span>Thapar Polytechnic College,</span>
                  <span>Bhadson Road, Patiala</span>
                </div>
              </div>
              <Link
                to="telephone:+91 17523-65554"
                className="flex justify-start items-center gap-2 flex-wrap">
                <FaPhone />
                +91 17523-65554
              </Link>
              <Link
                to="mailto:principaltpc@thapar.edu"
                target="_blank"
                className="flex justify-start items-center gap-2 ">
                <FaEnvelope /> principaltpc@thapar.edu
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.link}
                  target="_blank"
                  className="text-gray-200 hover:text-white transition-colors duration-300">
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="text-gray-200 text-sm text-center">
              © 2025 Thapar Polytechnic College. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
