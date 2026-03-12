import { useLocation, Link } from "react-router-dom";
import { Droplets, LayoutDashboard, MapPin, Bell } from "lucide-react";

const pages = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/simulation", label: "Simulation", icon: Droplets },
  { to: "/ward-readiness", label: "Ward Readiness", icon: MapPin },
  { to: "/alerts", label: "Alerts & Reports", icon: Bell },
];

const RadioNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border sm:top-0 sm:bottom-auto sm:border-t-0 sm:border-b">
      <div className="section-container flex items-center justify-between h-14 sm:h-16">
        {/* Logo - desktop only */}
        <Link to="/" className="hidden sm:flex items-center gap-2 font-display font-bold text-foreground">
          <Droplets className="w-5 h-5 text-primary" />
          <span>Flood<span className="gradient-text">Guard</span></span>
        </Link>

        {/* Radio buttons */}
        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-around sm:justify-end">
          {pages.map((p) => {
            const active = pathname === p.to;
            return (
              <Link
                key={p.to}
                to={p.to}
                className={`group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {/* Radio dot */}
                <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  active ? "border-primary-foreground" : "border-muted-foreground group-hover:border-foreground"
                }`}>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                </span>
                <p.icon className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">{p.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default RadioNav;
