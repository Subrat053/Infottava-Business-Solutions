import { LogOut, Bell, Menu as MenuIcon } from "lucide-react";
import logo from '../assets/team/logo-rmbg.png'

export default function Header() {
  // TODO: Implement real logout functionality
  const handleLogout = () => {
    console.log("Logout clicked");
  };
  
  // TODO: Implement mobile sidebar toggle
  const toggleMobileSidebar = () => {
      console.log("Toggle mobile sidebar");
  }

  return (
    <header className="bg-white backdrop-blur-s border flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileSidebar} className="md:hidden text-gray-400 hover:text-white">
            <MenuIcon size={24} />
        </button>

        {/* Spacer on desktop, Logo on mobile */}
        <div className="flex-1">
            <div className="flex items-left justify-center p-4 h-20">
        <img src={logo} alt="Infottava Logo" className="h-[50px] object-contain" />
      </div>
        </div>
        {/* Right side icons */}
        <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <LogOut size={16} /> 
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
    </header>
  );
}