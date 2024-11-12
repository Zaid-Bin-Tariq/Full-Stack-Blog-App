import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiMenu, HiX } from 'react-icons/hi'; // Add these icons for the hamburger menu

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 w-full min-w-20 z-10 py-5 shadow bg-orange-100 border-b border-black">
      <Container>
        <nav className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          
          {/* Hamburger menu for mobile view */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex ml-auto gap-3 items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-sm font-semibold inline-block px-6 py-2 duration-200 hover:bg-black rounded-full hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="lg:hidden absolute top-16 right-0 w-1/2 bg-orange-100 shadow-md flex flex-col gap-3 items-center py-4 border border-black">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setMenuOpen(false); // Close menu on selection
                      }}
                      className="text-sm font-semibold inline-block px-6 py-2 duration-200 hover:bg-black  hover:text-white border-b border-black"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
