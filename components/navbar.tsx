'use client'

import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { MainNav } from './main-nav';
import StoreSwitcher from './store-switcher';
import { ThemeToggle } from './theme-toggle';
import { X } from 'lucide-react';
import { MenuIcon } from 'lucide-react';

interface NavbarProps {
    stores: any
}

const Navbar: React.FC<NavbarProps> = ({
    stores
}) => {
 

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`${isMobileMenuOpen ? "h-screen fixed overlow-y-hidden z-50" : ""} border-b w-screen bg-background overflow-x-hidden`}>
      <div className="flex h-16 items-center px-3 ml-2">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-5 hidden lg:flex flex-auto align-items-center text-center" />
        <div className="ml-auto flex items-center space-x-4 mr-5">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
          <button
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden overflow-x-hidden">
          <MainNav className="bg-background h-full w-full z-50 text-center absolute overflow-x-hidden " />
        </div>
      )}
    </div>
  );
};

export default Navbar;
