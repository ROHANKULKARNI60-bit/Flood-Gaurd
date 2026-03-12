import React from "react";

const SimulationPage: React.FC = () => {
  return (
    <div className="pt-4 sm:pt-20 pb-20 sm:pb-4">
      <div className="section-container space-y-4">
        <header className="space-y-1">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Water Logging Simulation
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Explore an interactive simulation of water logging behaviour. Use this
            view to visually understand how rainfall and terrain can affect flood
            patterns across the area.
          </p>
        </header>

        <div className="w-full rounded-xl border border-border overflow-hidden bg-muted/30">
          <div className="aspect-[16/9] w-full">
            <iframe
              src="/flood_map.html"
              title="Water logging simulation"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;

