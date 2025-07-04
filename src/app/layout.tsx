import "./globals.css";
import type { Metadata } from "next";
import BackgroundLayout from "../components/BackgroundLayout";

export const metadata: Metadata = {
  title: "Fares Khanchouch | Cloud & DevOps Engineer Portfolio",
  description: "Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and automation. Building scalable infrastructure and CI/CD pipelines. View my projects and experience.",
  keywords: [
    "Cloud Engineer",
    "DevOps Engineer", 
    "AWS",
    "Kubernetes",
    "Terraform",
    "Docker",
    "CI/CD",
    "Infrastructure as Code",
    "Automation",
    "Python",
    "Go",
    "JavaScript",
    "Portfolio"
  ],
  authors: [{ name: "Fares Khanchouch" }],
  creator: "Fares Khanchouch",
  publisher: "Fares Khanchouch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fares-khanchouch.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fares Khanchouch | Cloud & DevOps Engineer Portfolio",
    description: "Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and automation. Building scalable infrastructure and CI/CD pipelines.",
    url: 'https://fares-khanchouch.vercel.app',
    siteName: 'Fares Khanchouch Portfolio',
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Fares Khanchouch - Cloud & DevOps Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fares Khanchouch | Cloud & DevOps Engineer Portfolio",
    description: "Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and automation. Building scalable infrastructure and CI/CD pipelines.",
    images: ['/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fares Khanchouch",
              "jobTitle": "Cloud & DevOps Engineer",
              "description": "Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and automation",
              "url": "https://fares-khanchouch.vercel.app",
              "image": "https://fares-khanchouch.vercel.app/avatar.png",
              "sameAs": [
                "https://github.com/Fares-Khanchouch"
              ],
              "knowsAbout": [
                "AWS",
                "Kubernetes", 
                "Terraform",
                "Docker",
                "CI/CD",
                "Infrastructure as Code",
                "Python",
                "Go",
                "JavaScript",
                "DevOps",
                "Cloud Computing"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "Organization", 
                "name": "Nuage Up"
              }
            })
          }}
        />
        
        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Fares Khanchouch Portfolio",
              "url": "https://fares-khanchouch.vercel.app",
              "description": "Cloud & DevOps Engineer Portfolio",
              "author": {
                "@type": "Person",
                "name": "Fares Khanchouch"
              }
            })
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/avatar.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <BackgroundLayout>{children}</BackgroundLayout>
      </body>
    </html>
  );
}
