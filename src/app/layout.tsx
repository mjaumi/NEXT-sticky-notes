import Providers from '@/redux/Providers';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { socket } from '@/lib/socketConnection';

// defining the font family here
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

// defining the metadata here
export const metadata: Metadata = {
  title: 'Sticky Notes || Made with love by MJ Aumi',
  description: 'A Next.js application where user can add & manage notes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // connecting socket here
  socket.on('connect', () => {});

  // rendering the layout of the web application here
  return (
    <html lang='en' className={`${poppins.variable}`}>
      <body className='font-poppins text-sticky-black'>
        <Providers>{children}</Providers>
        <ToastContainer position='top-center' />
      </body>
    </html>
  );
}
