import { useBuilderStore } from "../../store/useBuilderStore";
import { LayerNode } from "./LayerNode";

export const LayerPanel = () => {
  const tree = useBuilderStore(s => s.tree);
  
  return (
    <div style={{ width: 220, borderRight: '1px solid #ddd', padding: 8, overflow: 'auto'}}>
      <h4 style={{ margin: '0 0 8px' }}>Katmanlar</h4>
      <LayerNode 
        node={tree} 
        depth={0}
      />
    </div>
  );
};