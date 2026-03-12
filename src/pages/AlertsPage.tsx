import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, Camera, Clock, AlertTriangle, CheckCircle2, MapPin,
  Phone, MessageSquare, Send
} from "lucide-react";

type Alert = {
  id: number;
  type: "critical" | "warning" | "info";
  ward: string;
  message: string;
  time: string;
  acknowledged: boolean;
};

const mockAlerts: Alert[] = [
  { id: 1, type: "critical", ward: "Yamuna Vihar", message: "Score dropped to 28 — emergency teams auto-deployed. Drain overflow imminent on main nala.", time: "12 min ago", acknowledged: false },
  { id: 2, type: "critical", ward: "Chandni Chowk", message: "Score 39 — heavy debris accumulation detected near Red Fort drain. Immediate de-silting required.", time: "25 min ago", acknowledged: false },
  { id: 3, type: "critical", ward: "Laxmi Nagar", message: "Score 35 — V.P. Singh Marg drain at 90% capacity. 4 pumps dispatched from central reserve.", time: "1 hr ago", acknowledged: true },
  { id: 4, type: "warning", ward: "Okhla", message: "Score dropped to 42 from 51. Accelerated drain cleaning required in Phase 1.", time: "2 hrs ago", acknowledged: true },
  { id: 5, type: "warning", ward: "Karol Bagh", message: "Polythene blockage reported by citizen near Pusa Road. MCD field officer notified.", time: "3 hrs ago", acknowledged: true },
  { id: 6, type: "info", ward: "Dwarka", message: "Sector 10 routine inspection completed. All drains clear. Score maintained at 87.", time: "5 hrs ago", acknowledged: true },
  { id: 7, type: "info", ward: "Pitampura", message: "Pre-monsoon mesh filter installation completed at 6 drain points.", time: "6 hrs ago", acknowledged: true },
  { id: 8, type: "warning", ward: "Shahdara", message: "Water level sensor #14 reporting abnormal readings. Technician dispatched.", time: "7 hrs ago", acknowledged: true },
];

const alertConfig = {
  critical: { icon: AlertTriangle, color: "text-storm-red", bg: "bg-storm-red/10", border: "border-storm-red/30" },
  warning: { icon: Bell, color: "text-storm-amber", bg: "bg-storm-amber/10", border: "border-storm-amber/30" },
  info: { icon: CheckCircle2, color: "text-storm-green", bg: "bg-storm-green/10", border: "border-storm-green/30" },
};

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [reportMode, setReportMode] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = filterType === "all" ? alerts : alerts.filter((a) => a.type === filterType);

  const handleAcknowledge = (id: number) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  const handleReport = () => {
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    setReportText("");
    setTimeout(() => setReportSubmitted(false), 3000);
  };

  return (
    <div className="pt-4 sm:pt-20 pb-20 sm:pb-4">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">Alerts & Citizen Reports</h1>
            <p className="text-muted-foreground text-sm">Real-time flood alerts and community-powered drain monitoring</p>
          </div>
          <button
            onClick={() => setReportMode(!reportMode)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display font-semibold text-sm transition-colors ${
              reportMode ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            <Camera className="w-4 h-4" />
            {reportMode ? "View Alerts" : "Report a Blocked Drain"}
          </button>
        </div>

        {/* Report mode */}
        {reportMode ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 max-w-lg mx-auto">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Report a Blocked Drain
            </h2>

            {reportSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-storm-green mx-auto mb-3" />
                <p className="font-display font-semibold text-foreground">Report Submitted!</p>
                <p className="text-muted-foreground text-sm mt-1">Your report has been sent to the nearest MCD field officer. Thank you for keeping Delhi safe.</p>
                <p className="text-primary text-xs mt-3 font-medium">+5 Green Credits earned 🌿</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Auto-detected: Karol Bagh, Central Delhi</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Describe the issue</label>
                  <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full p-3 rounded-lg bg-muted border border-border text-foreground text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Large polythene blockage near Pusa Road drain..."
                  />
                </div>
                <div className="p-3 rounded-lg border border-dashed border-border text-center">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Tap to add a photo (optional)</p>
                </div>
                <button
                  onClick={handleReport}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" /> Submit Report
                </button>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="font-display text-sm font-semibold text-foreground mb-2">Emergency Contacts</h4>
              <div className="flex gap-3">
                <a href="tel:1916" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-storm-red/10 text-storm-red text-sm font-medium">
                  <Phone className="w-4 h-4" /> 1916 (Flood Control)
                </a>
                <a href="tel:112" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-storm-amber/10 text-storm-amber text-sm font-medium">
                  <Phone className="w-4 h-4" /> 112 (Emergency)
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Alert filters */}
            <div className="flex gap-1 mb-4">
              {[
                { key: "all", label: "All" },
                { key: "critical", label: "Critical" },
                { key: "warning", label: "Warning" },
                { key: "info", label: "Resolved" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterType === f.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Alert list */}
            <div className="space-y-3">
              {filtered.map((a, i) => {
                const cfg = alertConfig[a.type];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`glass-card p-4 border-l-4 ${cfg.border} ${a.acknowledged ? "opacity-70" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-semibold text-foreground text-sm">{a.ward}</span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {a.time}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{a.message}</p>
                        {!a.acknowledged && (
                          <button
                            onClick={() => handleAcknowledge(a.id)}
                            className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Citizen engagement */}
            <div className="mt-8 glass-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Citizen Engagement
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { val: "1,247", label: "Reports this month", sub: "Blocked drain photos verified by MCD" },
                  { val: "₹2.4L", label: "Green Credits distributed", sub: "Redeemable as cash or Metro top-ups" },
                  { val: "4 Languages", label: "App availability", sub: "Hindi, English, Punjabi, Urdu" },
                ].map((s) => (
                  <div key={s.label} className="bg-muted/50 rounded-lg p-4">
                    <div className="font-display text-xl font-bold gradient-text mb-0.5">{s.val}</div>
                    <div className="font-display font-semibold text-foreground text-sm">{s.label}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
