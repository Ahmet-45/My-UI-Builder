import { useBuilderStore } from "../../store/useBuilderStore";
import { RenderNode } from './RenderNode'

export const CanvasPanel = () => {
  const tree = useBuilderStore(s => s.tree);
  const selectNode = useBuilderStore(s => s.selectNode);

  return (
    <div 
      onClick={() => selectNode(null)}
      style={{ minHeight: '100%', padding: '20px', backgroundColor: '#fff'}}>
        <RenderNode node={tree} />
      </div>
  );
};