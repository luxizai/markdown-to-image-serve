import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import 'markdown-to-poster/dist/style.css'


export default function PosterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       {children}
      </body>
    </html>
  );
}