import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './(components)/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BrainBuddy',
  description: 'An education website with integrated AI that creates personalized study plans',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
