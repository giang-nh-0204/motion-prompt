import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Studio — Footer',
  description: 'Fresh ideas, imagination, and creative collaboration.',
  icons: { icon: '/logo.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
