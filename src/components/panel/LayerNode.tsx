import { UINode } from "../../types/builder";
import { useBuilderStore } from "../../store/useBuilderStore";

export const LayerNode = ({ node, depth }: { node: UINode; depth: number }) => {
  const selectNode = useBuilderStore(s => s.selectNode);
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const isSelected = selectedNodeId === node.id;
  const moveNode = useBuilderStore(s => s.moveNode);
  const dragOverId = useBuilderStore(s => s.dragOverId);
  const isDragOver = dragOverId === node.id;
  const setDragOverId = useBuilderStore(s => s.setDragOverId);
  return (
    <div>
      <div
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          e.dataTransfer.setData('nodeId', node.id);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverId(node.id);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const draggedId = e.dataTransfer.getData('nodeId');
          if(draggedId) moveNode(draggedId, node.id);
          setDragOverId(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectNode(node.id);
        }}
        
        style={{
          paddingLeft: depth * 16 + 8,
          paddingTop: 4,
          paddingBottom: 4,
          paddingRight: 8,
          cursor: 'pointer',
          backgroundColor: isSelected ? '#cce5ff' : 'transparent',
          outline: isDragOver ? '2px solid orange' : 'none',
          outlineOffset: -2,
          fontSize: 13,
        }}
      >
        {node.type} - {node.id.slice(0, 6)}
      </div>

      {node.children?.map((child) => (
        <LayerNode 
          key={child.id} 
          node={child} 
          depth={depth + 1} 
        />
      ))}  
    </div>
  );
};