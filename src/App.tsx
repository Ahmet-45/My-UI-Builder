// src/App.tsx
import { CanvasPanel } from "./components/canvas/CanvasPanel";
import { InspectorPanel } from "./components/panel/InspectorPanel";
import { LayerPanel } from "./components/panel/LayerPanel";
import { LeftPanel } from "./components/panel/leftPanel";
import { useState } from "react";
import { ExportPanel } from "./components/panel/ExportPanel"
import { useBuilderStore } from "./store/useBuilderStore";
import { SavesPanel } from "./components/panel/SavesPanel";
import { SaveDialog } from "./components/panel/SaveDialog";

export default function App() {
  const [showTools, setShowTools] = useState(true);
  const [showLayers, setShowLayers] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showSaves, setShowSaves] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const saveTree = useBuilderStore(s => s.saveTree);
  const loadTree = useBuilderStore(s => s.loadTree);
  const [toast, setToast] = useState<{ msg: string; ok: Boolean} | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2000);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <button onClick={() => setShowTools(v => !v)}>Araçlar</button>
        <button onClick={() => setShowLayers(v => !v)}>Katmanlar</button>
        <button onClick={() => setShowInspector(v => !v)}>Özellikler</button>
        <button onClick={() => setShowExport(true)}>Export</button>
        <button onClick={() => setShowSaveDialog(true)}>Kaydet</button>
        <button onClick={() => setShowSaves(true)}>Yükle</button>
        {toast && <span style={{ color: toast.ok ? 'green' : 'red', fontSize: 13, marginLeft: 8 }}>{toast.msg}</span>}
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showTools && <LeftPanel />}
        {showLayers && <LayerPanel />}
        <div style={{ flex: 1, overflow: 'auto' }}><CanvasPanel /></div>
        {showInspector && <div style={{ width: 280, overflow: 'auto' }}><InspectorPanel /></div>}
      </div>
      {showSaveDialog && (
        <SaveDialog 
          onConfirm={(name) => { saveTree(name); showToast(`"${name}" kaydedildi`);}}
          onClose={() => setShowSaveDialog(false)}
        />
      )}
      {showSaves && <SavesPanel onClose={() => setShowSaves(false)} /> }
      {showExport && <ExportPanel onClose={() => setShowExport(false)} />}
    </div>
  );
};

