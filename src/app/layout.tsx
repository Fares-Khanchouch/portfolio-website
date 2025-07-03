import "./globals.css";
import type { Metadata } from "next";
import BackgroundLayout from "../components/BackgroundLayout";

export const metadata: Metadata = {
  title: "Fares | Portfolio",
  description: "Portfolio site for Fares – web apps, automation, and GPT tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BackgroundLayout>{children}</BackgroundLayout>
      </body>
    </html>
  );
}
