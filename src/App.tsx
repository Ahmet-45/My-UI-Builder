// src/App.tsx
import { CanvasPanel } from "./components/canvas/CanvasPanel";
import { InspectorPanel } from "./components/panel/InspectorPanel";
import { LayerPanel } from "./components/panel/LayerPanel";
import { LeftPanel } from "./components/panel/leftPanel";
import { useState } from "react";
import { ExportPanel } from "./components/panel/ExportPanel"

export default function App() {
  const [showExport, setShowExport] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      <LeftPanel onExportClick={() => setShowExport(true)} />
      <LayerPanel/>
      <div style={{ flex:1, overflow: 'auto'}}><CanvasPanel/></div>
      <div style={{ width: 280, overflow: 'auto' }}><InspectorPanel/></div>
      {showExport && <ExportPanel onClose={() => setShowExport(false)} />}
    </div>
  );
};

