// src/App.tsx
import { CanvasPanel } from "./components/canvas/CanvasPanel";
import { InspectorPanel } from "./components/panel/InspectorPanel";
import { LayerPanel } from "./components/panel/LayerPanel";
import { LeftPanel } from "./components/panel/leftPanel";

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      <LeftPanel/>
      <LayerPanel/>
      <div style={{ flex:1, overflow: 'auto'}}><CanvasPanel/></div>
      <div style={{ width: 280, overflow: 'auto' }}><InspectorPanel/></div>
    </div>
  );
};

