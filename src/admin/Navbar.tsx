import { FC } from 'react';
import useAuth from './hooks/useAuth';

const Navbar: FC = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm mt-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">Admin Dashboard</div>
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
