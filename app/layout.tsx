import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const baseURL = new URL(siteURL.endsWith("/") ? siteURL : `${siteURL}/`);
const socialImageURL = new URL("og.png", baseURL).toString();
const title = "KITKAT Mac Health — Your Mac. Under Control.";
const description =
  "A native macOS health monitor and reversible creative-cache cleaner built for Apple silicon.";

export const metadata: Metadata = {
  metadataBase: baseURL,
  title,
  description,
  icons: {
    icon: `${basePath}/media/kitkat-icon.png`,
    shortcut: `${basePath}/media/kitkat-icon.png`,
    apple: `${basePath}/media/kitkat-icon.png`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: baseURL,
    images: [{ url: socialImageURL, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageURL],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
