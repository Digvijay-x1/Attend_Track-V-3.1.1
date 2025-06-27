import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator,
  UserCog,
  ClipboardEdit,
  LogOut
} from 'lucide-react';

const SidebarContent = ({ onItemClick }) => {
  const { authUser, logout } = useAuthStore();
  const location = useLocation();
  const { name, email, profilePicture } = authUser?.user || {};

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/attendance', icon: <ClipboardEdit size={20} />, label: 'Attendance Input' },
    { path: '/subjects', icon: <BookOpen size={20} />, label: 'Subject Management' },
    { path: '/calculator', icon: <Calculator size={20} />, label: 'Calculator' },
    { path: '/profile', icon: <UserCog size={20} />, label: 'Profile Settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-base-100 h-full flex flex-col overflow-y-auto relative">
      {/* Logo and sidebar top section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="size-11 bg-primary text-primary-content p-2 rounded-lg">
            <span className="font-bold text-lg">A.T</span>
          </div>
          <h1 className="text-xl font-bold text-base-content">Attend. Track</h1>
        </div>

        {/* Navigation items */}
        <ul className="space-y-1 mb-24">
          {navItems.map((item) => (
            <li key={item.path} onClick={onItemClick}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-200 text-base-content'
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: isActive(item.path) ? 'text-primary-content' : 'text-base-content'
                })}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User profile and logout - fixed at bottom */}
      {authUser && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 bg-base-300/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-base-200 overflow-hidden">
              <img 
                src={profilePicture || "/avatar.png"} 
                alt={name || "User"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-base-content">{name || "John Doe"}</p>
              <p className="text-sm text-base-content/70">{email || "john.doe@college.edu"}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              logout();
              if (onItemClick) onItemClick();
            }}
            className="w-full flex items-center justify-center gap-2 p-2 border border-base-300 rounded-md hover:bg-primary hover:text-primary-content transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarContent; 