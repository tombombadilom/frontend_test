import { Database, Home, Server, Settings, Shield } from 'lucide-react';
import type React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/services', icon: Server, label: 'Services' },
    { to: '/certificates', icon: Shield, label: 'Certificates' },
    { to: '/dns', icon: Database, label: 'DNS' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-card text-card-foreground">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Gateway CLI</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-2 text-sm ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
