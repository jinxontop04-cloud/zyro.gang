import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "zyro.lol — Aesthetic Bio Links",
  description: "zyro.lol app for ur desing profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
