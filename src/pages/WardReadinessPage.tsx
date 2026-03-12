import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Wrench,
  Droplets, Trash2, Zap, Users
} from "lucide-react";

const wards = [
  {
    name: "Dwarka", zone: "South-West", score: 87, risk: "low",
    drainage: 94, pumps: 12, teams: 4, lastCleaned: "2 days ago",
    actions: ["Routine inspection of storm drains on Sector 10 Road", "Verify backup generator at pumping station #3"],
  },
  {
    name: "Rohini", zone: "North", score: 71, risk: "medium",
    drainage: 78, pumps: 8, teams: 3, lastCleaned: "5 days ago",
    actions: ["Clear debris from Sector 7 main nala", "Check pump #5 — reported low pressure", "Deploy sandbags near Pocket B-2"],
  },
  {
    name: "Saket", zone: "South", score: 63, risk: "medium",
    drainage: 65, pumps: 6, teams: 2, lastCleaned: "1 week ago",
    actions: ["Urgent: Clear plastic blockage near Press Enclave Road", "Inspect mesh filters at 4 identified hotspots", "Position mobile pump near Saket Metro"],
  },
  {
    name: "Okhla", zone: "South-East", score: 42, risk: "high",
    drainage: 38, pumps: 4, teams: 2, lastCleaned: "12 days ago",
    actions: ["CRITICAL: Full drain cleaning of Okhla Phase 1 main line", "Deploy 3 additional pumps from reserve", "Station emergency crew near Jasola flyover", "Install mesh filters at 8 uncovered drain points"],
  },
  {
    name: "Yamuna Vihar", zone: "East", score: 28, risk: "critical",
    drainage: 22, pumps: 3, teams: 1, lastCleaned: "3 weeks ago",
    actions: ["EMERGENCY: Mobilize cleaning squad for entire ward drainage system", "Request 5 mobile pumps from central depot", "Pre-position rescue boats at known low-points", "Alert hospitals in zone for potential flood casualties", "Evacuate ground-floor residents near Wazirabad drain"],
  },
  {
    name: "Karol Bagh", zone: "Central", score: 55, risk: "high",
    drainage: 52, pumps: 5, teams: 2, lastCleaned: "10 days ago",
    actions: ["Clear polythene blockages near Pusa Road", "Deploy extra pump near Karol Bagh Metro", "Coordinate with traffic police for road diversions"],
  },
  {
    name: "Laxmi Nagar", zone: "East", score: 35, risk: "critical",
    drainage: 30, pumps: 3, teams: 1, lastCleaned: "2 weeks ago",
    actions: ["EMERGENCY: Complete drain flush on V.P. Singh Marg", "Deploy 4 pumps from central reserve", "Set up sandbag barriers at 6 entry points", "Coordinate with DTC for bus diversions"],
  },
  {
    name: "Chandni Chowk", zone: "Central", score: 39, risk: "critical",
    drainage: 28, pumps: 2, teams: 1, lastCleaned: "18 days ago",
    actions: ["EMERGENCY: Heritage-area drain de-silting", "Install 10 mesh filters at open drain points", "Deploy pumps near Red Fort drain outflow", "Alert shopkeepers association for sandbagging", "Pre-position rescue team near Jama Masjid area"],
  },
];

const riskConfig = {
  low: { color: "bg-storm-green", text: "text-storm-green", border: "border-storm-green" },
  medium: { color: "bg-rain-light", text: "text-rain-light", border: "border-rain-light" },
  high: { color: "bg-storm-amber", text: "text-storm-amber", border: "border-storm-amber" },
  critical: { color: "bg-storm-red", text: "text-storm-red", border: "border-storm-red" },
};

const WardReadinessPage = () => {
  const [expanded, setExpanded] = useState<string | null>(wards[4].name);
  const sorted = [...wards].sort((a, b) => a.score - b.score);

  return (
    <div className="pt-4 sm:pt-20 pb-20 sm:pb-4">
      <div className="section-container">
        <div className="mb-6">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">Ward Readiness Analysis</h1>
          <p className="text-muted-foreground text-sm">Pre-Monsoon readiness scores with actionable checklists for each ward. Sorted by urgency.</p>
        </div>

        {/* Score legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { range: "80–100", label: "Well Prepared", cls: "bg-storm-green/10 text-storm-green border-storm-green/30" },
            { range: "60–79", label: "Minor Gaps", cls: "bg-rain-light/10 text-rain-light border-rain-light/30" },
            { range: "40–59", label: "Needs Attention", cls: "bg-storm-amber/10 text-storm-amber border-storm-amber/30" },
            { range: "0–39", label: "Urgent Action", cls: "bg-storm-red/10 text-storm-red border-storm-red/30" },
          ].map((s) => (
            <span key={s.range} className={`px-3 py-1 rounded-full text-xs font-semibold border ${s.cls}`}>
              {s.range}: {s.label}
            </span>
          ))}
        </div>

        {/* Ward cards */}
        <div className="space-y-3">
          {sorted.map((w, i) => {
            const cfg = riskConfig[w.risk as keyof typeof riskConfig];
            const isOpen = expanded === w.name;

            return (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`glass-card overflow-hidden border-l-4 ${cfg.border}`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : w.name)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Score */}
                  <div className="relative w-12 h-12 shrink-0">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
                        strokeDasharray={`${(w.score / 100) * 125.6} 125.6`} strokeLinecap="round" className={cfg.text} />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center font-display font-bold text-xs ${cfg.text}`}>
                      {w.score}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-foreground">{w.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-primary-foreground capitalize ${cfg.color}`}>
                        {w.risk}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-xs">{w.zone} Delhi • {w.actions.length} pending actions</div>
                  </div>

                  {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-border pt-4">
                        {/* Stats row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                          {[
                            { icon: Droplets, val: `${w.drainage}%`, label: "Drain Capacity" },
                            { icon: Zap, val: `${w.pumps}`, label: "Active Pumps" },
                            { icon: Users, val: `${w.teams}`, label: "Field Teams" },
                            { icon: Trash2, val: w.lastCleaned, label: "Last Cleaned" },
                          ].map((s) => (
                            <div key={s.label} className="bg-muted/50 rounded-lg p-3">
                              <s.icon className="w-4 h-4 text-primary mb-1" />
                              <div className="font-display font-bold text-foreground text-sm">{s.val}</div>
                              <div className="text-muted-foreground text-[10px]">{s.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Action checklist */}
                        <h4 className="font-display font-semibold text-foreground text-sm mb-2 flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 text-primary" />
                          Action Checklist
                        </h4>
                        <ul className="space-y-2">
                          {w.actions.map((a, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              {a.startsWith("EMERGENCY") || a.startsWith("CRITICAL") ? (
                                <AlertCircle className="w-4 h-4 text-storm-red shrink-0 mt-0.5" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                              )}
                              <span className={`${a.startsWith("EMERGENCY") || a.startsWith("CRITICAL") ? "text-storm-red font-medium" : "text-muted-foreground"}`}>
                                {a}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WardReadinessPage;
