
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PenLine, Home, Users, UserCircle } from 'lucide-react';

const MainNav: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const items = [
    {
      title: 'Home',
      href: '/',
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      title: 'Editor',
      href: '/editor',
      icon: <PenLine className="h-4 w-4 mr-2" />,
    },
    {
      title: 'Community',
      href: '/community',
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    ...(user
      ? [
          {
            title: 'Profile',
            href: '/profile',
            icon: <UserCircle className="h-4 w-4 mr-2" />,
          },
        ]
      : []),
  ];

  return (
    <nav className="flex items-center space-x-2">
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={location.pathname === item.href ? 'default' : 'ghost'}
          size="sm"
        >
          <Link to={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default MainNav;
