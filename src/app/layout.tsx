import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { about, hero, site, social } from "@/data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "profile",
    firstName: hero.firstName,
    lastName: hero.lastName,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
  ],
  colorScheme: "dark light",
};

// Structured data so search engines connect this page, the GitHub and the
// LinkedIn profiles to one person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/avatar-512.jpg`,
  jobTitle: hero.headline,
  description: site.description,
  email: `mailto:${social.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "ISTY, Université Paris-Saclay" },
  knowsLanguage: ["ar", "fr", "en"],
  knowsAbout: about.skills,
  sameAs: [social.github, social.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-bg-raised focus:px-4 focus:py-2 focus:text-fg"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // JSON.stringify output of static data; "<" escaped so it can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
