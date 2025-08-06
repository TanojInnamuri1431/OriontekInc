
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oriontek Inc - Consultative Technology Partner',
  description: 'We deliver end-to-end software solutions that significantly reduce cost, increase productivity and enhance the market position of our clients.',
  keywords: 'technology solutions, software services, insurance, healthcare, financial services, offshore development, Oracle, Microsoft, Web 2.0, SDLC consulting',
  authors: [{ name: 'Oriontek Inc' }],
  robots: 'index, follow',
  icons: {
    icon: '/assets/oriontek-logo.png',
    shortcut: '/assets/oriontek-logo.png',
    apple: '/assets/oriontek-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oriontekinc.com',
    title: 'Oriontek Inc - Consultative Technology Partner',
    description: 'We deliver end-to-end software solutions that significantly reduce cost, increase productivity and enhance the market position of our clients.',
    siteName: 'Oriontek Inc',
    images: [
      {
        url: '/assets/oriontek-logo.png',
        width: 1000,
        height: 369,
        alt: 'Oriontek Inc Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oriontek Inc - Consultative Technology Partner',
    description: 'We deliver end-to-end software solutions that significantly reduce cost, increase productivity and enhance the market position of our clients.',
    images: ['/assets/oriontek-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
