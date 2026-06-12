import React, { ReactNode } from 'react';
import { Avatar } from '@radix-ui/react-avatar';

interface LayoutProps {
  children: ReactNode; // Define children type explicitly
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">YouTube Clone</h1>
          <Avatar className="w-10 h-10 bg-gray-200 rounded-full" />
        </nav>
      </header>
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
