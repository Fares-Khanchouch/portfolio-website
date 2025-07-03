import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black/40 backdrop-blur-sm border-t border-gray-700 py-6 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left side: Copyright */}
        <p className="text-sm text-gray-300">
          © 2025 Fares Khanchouch. All rights reserved.
        </p>

        {/* Right side: Social Icons */}
        <div className="flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/fares-khanchouch/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Fares-Khanchouch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
