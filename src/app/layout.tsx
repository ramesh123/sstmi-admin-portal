'use client';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const signOutRedirect = () => {
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const logoutUri = process.env.NEXT_PUBLIC_LOGOUT_URI; 
  const cognitoDomain = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`;
  sessionStorage.removeItem('adminuser');
  sessionStorage.removeItem('token');
  
  if (clientId && logoutUri && cognitoDomain) {
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  } else {
    console.error('Missing environment variables for Cognito logout.');
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = !pathname.includes('/login') && !pathname.includes('/callback');

  const handleLogout = () => {
    signOutRedirect();
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          {showHeader && (
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src={process.env.NEXT_PUBLIC_LOGO_PATH || '/default-logo.png'}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h1 className="text-xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME || 'SSTMI Admin'}</h1>
              </div>
              <nav className="flex space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </nav>
            </header>
          )}
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
