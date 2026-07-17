// src/components/panel/leftPanel.tsx
import { useBuilderStore } from '../../store/useBuilderStore';

export const LeftPanel = () => {
  const addNode = useBuilderStore(state => state.addNode);

  return (
    <div style={{ width: '200px', padding: '16px', backgroundColor: '#f4f4f4'}}>
      <h3>Arac Kutusu</h3>
      <button onClick={() => addNode("container")}>Kutu Ekle</button>
      <button onClick={() => addNode("button")}>Buton Ekle</button>
    </div>
  );
};