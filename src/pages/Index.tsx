import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Droplets, AlertTriangle, TrendingDown, MapPin, ArrowRight, Bell,
  CloudRain, ThermometerSun, Wind, Clock
} from "lucide-react";
import RainEffect from "@/components/RainEffect";
import heroImage from "@/assets/hero-flood.jpg";

// Mock live data
const liveWeather = {
  rainfall: "42 mm/hr",
  temp: "31°C",
  humidity: "89%",
  wind: "18 km/h",
  forecast: "Heavy Rain Expected",
  lastUpdate: "2 mins ago",
};

const wardData = [
  { name: "Dwarka", zone: "South-West", score: 87, risk: "low", drains: 94, alerts: 0 },
  { name: "Rohini", zone: "North", score: 71, risk: "medium", drains: 78, alerts: 1 },
  { name: "Saket", zone: "South", score: 63, risk: "medium", drains: 65, alerts: 2 },
  { name: "Okhla", zone: "South-East", score: 42, risk: "high", drains: 38, alerts: 4 },
  { name: "Yamuna Vihar", zone: "East", score: 28, risk: "critical", drains: 22, alerts: 7 },
  { name: "Karol Bagh", zone: "Central", score: 55, risk: "high", drains: 52, alerts: 3 },
  { name: "Janakpuri", zone: "West", score: 76, risk: "medium", drains: 81, alerts: 1 },
  { name: "Laxmi Nagar", zone: "East", score: 35, risk: "critical", drains: 30, alerts: 5 },
  { name: "Pitampura", zone: "North-West", score: 82, risk: "low", drains: 88, alerts: 0 },
  { name: "Chandni Chowk", zone: "Central", score: 39, risk: "critical", drains: 28, alerts: 6 },
  { name: "Vasant Kunj", zone: "South-West", score: 91, risk: "low", drains: 96, alerts: 0 },
  { name: "Shahdara", zone: "North-East", score: 47, risk: "high", drains: 41, alerts: 3 },
];

const riskConfig = {
  low: { color: "bg-storm-green", text: "text-storm-green", label: "Safe" },
  medium: { color: "bg-rain-light", text: "text-rain-light", label: "Monitor" },
  high: { color: "bg-storm-amber", text: "text-storm-amber", label: "Warning" },
  critical: { color: "bg-storm-red", text: "text-storm-red", label: "Critical" },
};

const DashboardPage = () => {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return wardData;
    return wardData.filter((w) => w.risk === filter);
  }, [filter]);

  const criticalCount = wardData.filter((w) => w.risk === "critical").length;
  const avgScore = Math.round(wardData.reduce((a, w) => a + w.score, 0) / wardData.length);
  const totalAlerts = wardData.reduce((a, w) => a + w.alerts, 0);

  return (
    <div className="pt-4 sm:pt-20 pb-20 sm:pb-4">
      {/* Hero strip */}
      <section className="relative overflow-hidden mb-6">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.9 }} />
        </div>
        <RainEffect count={30} />
        <div className="relative section-container py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">
                Delhi Flood Warning System
              </h1>
              <p className="text-rain-pale/70 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Live • Updated {liveWeather.lastUpdate}
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { icon: CloudRain, val: liveWeather.rainfall, label: "Rainfall" },
                { icon: ThermometerSun, val: liveWeather.temp, label: "Temp" },
                { icon: Wind, val: liveWeather.wind, label: "Wind" },
              ].map((w) => (
                <div key={w.label} className="bg-rain-deep/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[70px]">
                  <w.icon className="w-4 h-4 text-rain-glow mx-auto mb-0.5" />
                  <div className="text-primary-foreground font-display font-bold text-sm">{w.val}</div>
                  <div className="text-rain-pale/50 text-[10px]">{w.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-container">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: MapPin, val: "2,500+", label: "Hotspots Tracked", accent: "text-primary" },
            { icon: TrendingDown, val: `${avgScore}`, label: "Avg Readiness", accent: avgScore > 60 ? "text-storm-green" : "text-storm-amber" },
            { icon: AlertTriangle, val: `${criticalCount}`, label: "Critical Wards", accent: "text-storm-red" },
            { icon: Droplets, val: `${totalAlerts}`, label: "Active Alerts", accent: "text-storm-amber" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <s.icon className={`w-5 h-5 ${s.accent} mb-2`} />
              <div className={`font-display text-xl sm:text-2xl font-bold ${s.accent}`}>{s.val}</div>
              <div className="text-muted-foreground text-xs">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter + ward grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Ward Status</h2>
          <div className="flex gap-1">
            {["all", "critical", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {filtered.map((w, i) => {
            const cfg = riskConfig[w.risk as keyof typeof riskConfig];
            return (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card p-4 flex items-center gap-4 hover:shadow-[var(--shadow-elevated)] transition-shadow"
              >
                {/* Score circle */}
                <div className="relative w-14 h-14 shrink-0">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="24" fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray={`${(w.score / 100) * 150.8} 150.8`}
                      strokeLinecap="round"
                      className={cfg.text}
                    />
                  </svg>
                  <span className={`absolute inset-0 flex items-center justify-center font-display font-bold text-sm ${cfg.text}`}>
                    {w.score}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-display font-semibold text-foreground truncate">{w.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-primary-foreground ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs">{w.zone} Delhi</div>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span>Drains: {w.drains}%</span>
                    <span>Alerts: {w.alerts}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick link */}
        <div className="flex justify-center gap-3">
          <Link
            to="/ward-readiness"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Detailed Ward Analysis <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/alerts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-display font-semibold text-sm hover:bg-muted transition-colors"
          >
            View Alerts <Bell className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
