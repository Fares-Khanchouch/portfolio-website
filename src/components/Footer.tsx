import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { social } from "@/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#4a7fa5]/10 bg-[#0a0f1e] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left: monogram + copyright */}
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-geist-mono)] text-sm font-bold tracking-[0.08em] text-[#f8fafc]">
            fk<span className="text-[#4a7fa5]">.</span>
          </span>
          <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-widest text-[#4a5568]">
            © {year} Fares Khanchouch
          </p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${social.email}`}
            aria-label="Email"
            className="text-[#4a5568] hover:text-[#4a7fa5] transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#4a5568] hover:text-[#4a7fa5] transition-colors duration-200"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#4a5568] hover:text-[#4a7fa5] transition-colors duration-200"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={social.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className="text-[#4a5568] hover:text-[#4a7fa5] transition-colors duration-200"
          >
            <FileText className="h-4 w-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
