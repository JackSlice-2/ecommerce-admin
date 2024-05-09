import { UserButton, auth } from '@clerk/nextjs';
import React from 'react'
import { MainNav } from './main-nav';
import StoreSwitcher from './store-switcher';
import { redirect, useParams } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
    
  return (    
    <div className='border-b'>
        <div className="flex h-16 items-center px-3">
            <StoreSwitcher items={stores}/>
        <MainNav className="mx-5 align-items-center flex-auto text-center"/>
        <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    </div>
  );
}

export default Navbar;