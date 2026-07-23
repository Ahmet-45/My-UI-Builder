// src/components/panel/leftPanel.tsx
import { useBuilderStore } from '../../store/useBuilderStore';

export const LeftPanel = () => {
  const addNode = useBuilderStore(state => state.addNode);
  const deleteNode = useBuilderStore(s => s.deleteNode);
  const resetTree = useBuilderStore(s => s.resetTree);
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const rootId = useBuilderStore(s => s.tree.id);

  const canDelete = selectedNodeId !== null && selectedNodeId !== rootId;

  return (
    <div style={{ width: '200px', padding: 16, backgroundColor: '#f4f4f4' }}>
      <h3>Arac Kutusu</h3>
      <button onClick={() => addNode("container")}>Kutu Ekle</button>
      <button onClick={() => addNode("button")}>Buton Ekle</button>
      <button onClick={() => addNode("text")}>Metin Ekle</button>
      <hr style={{ margin: '12px 0' }} />

      <button onClick={deleteNode} disabled={!canDelete}>
        Sil
      </button>
      <button onClick={resetTree}>Reset</button>
    </div>
  );
};