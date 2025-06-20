import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils/url";
import { Users, Settings, Trophy } from "lucide-react";
import { User } from "../../../entities/Player";

const Layout:React.FC = () => {
  const location = useLocation();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    // const getUser = async () => {
    //   try {
    //     const userData = await User.me();
    //     setUser(user);
    //   } catch (error) {
    //     console.log("User not authenticated");
    //   }
    // };
    // getUser();
    const getUser = async () => {
      try {
        const fakeAdmin: User = {
          id: "3",
          name: "בנימין בר",
          role: "admin",
        };
        setUser(fakeAdmin);
      } catch (error) {
        console.log("User not authenticated");
      }
    };
    getUser();
  }, []);

  const navigationItems = [
    {
      title: "שחקנים",
      url: createPageUrl("Players"),
      icon: Users,
    },
    ...(user?.role === "admin"
      ? [
          {
            title: "ניהול",
            url: createPageUrl("Management"),
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  מועדון הכדורגל
                </h1>
                <p className="text-xs text-slate-500">ניהול שחקנים</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.url
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>

            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user.role === "admin" ? "מנהל" : "משתמש"}
                  </p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="md:hidden bg-white border-b border-blue-100 px-4 py-3">
        <div className="flex justify-center gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.url
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-1 bg-blue-50">
          <Outlet />
      </main> 

      <footer className="bg-white border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-slate-500 text-sm">
            © 2024 מועדון הכדורגל - מערכת ניהול שחקנים
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout
