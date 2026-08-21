import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Biolink.WTF — Aesthetic Bio Links",
  description: "Advanced bio link platform inspired by guns.lol and lethal.wtf",
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
