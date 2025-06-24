'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isLoggedIn, clearToken } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">BLOGS</Link>

        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex space-x-4 items-center">
          {loggedIn ? (
            <>
              <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300" href="/dashboard">Dashboard</Link>
              <button
                className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300" href="/login">Login</Link>
              <Link className="px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300" href="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          {loggedIn ? (
            <>
              <Link className="block px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300" href="/dashboard" onClick={toggleMenu}>Dashboard</Link>
              <button
                className="block w-full text-left px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="block px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300" href="/login" onClick={toggleMenu}>Login</Link>
              <Link className="block px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300" href="/signup" onClick={toggleMenu}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
