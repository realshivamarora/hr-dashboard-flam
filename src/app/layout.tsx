import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'HR Dashboard',
  description: 'Mini HR Performance Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          className="navbar navbar-expand-lg px-4"
          style={{ backgroundColor: '#1c193e' }}
        >
          <Link className="navbar-brand text-white fw-bold" href="/">
            HR Dashboard
          </Link>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 bg-light min-vh-100 p-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/"
                    style={{ color: '#1c193e' }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/bookmarks"
                    style={{ color: '#1c193e' }}
                  >
                    Bookmarks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    href="/analytics"
                    style={{ color: '#1c193e' }}
                  >
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-10 p-4">{children}</div>
          </div>
        </div>
        <footer
  style={{
    backgroundColor: '#1c193e',
    color: 'white',
    textAlign: 'center',
    padding: '12px 0',
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
  }}
>
  Made with <span style={{ color: 'red' }}>❤️</span> by <strong>Shivam Arora</strong> for Flam
  <br />
  <a
    href="https://aroratech.tech"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#ffc107', textDecoration: 'underline' }}
  >
    Learn More About Me at aroratech.tech
  </a>
</footer>

      </body>
    </html>
  );
}
