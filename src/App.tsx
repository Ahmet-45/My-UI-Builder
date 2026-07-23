// src/App.tsx
import { CanvasPanel } from "./components/canvas/CanvasPanel";
import { InspectorPanel } from "./components/panel/InspectorPanel";
import { LayerPanel } from "./components/panel/LayerPanel";
import { LeftPanel } from "./components/panel/leftPanel";
import { useState } from "react";
import { ExportPanel } from "./components/panel/ExportPanel"

export default function App() {
  const [showTools, setShowTools] = useState(true);
  const [showLayers, setShowLayers] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [showExport, setShowExport] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <button onClick={() => setShowTools(v => !v)}>Araçlar</button>
        <button onClick={() => setShowLayers(v => !v)}>Katmanlar</button>
        <button onClick={() => setShowInspector(v => !v)}>Özellikler</button>
        <button onClick={() => setShowExport(true)}>Export</button>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showTools && <LeftPanel />}
        {showLayers && <LayerPanel />}
        <div style={{ flex: 1, overflow: 'auto' }}><CanvasPanel /></div>
        {showInspector && <div style={{ width: 280, overflow: 'auto' }}><InspectorPanel /></div>}
      </div>

      {showExport && <ExportPanel onClose={() => setShowExport(false)} />}
    </div>
  );
};

