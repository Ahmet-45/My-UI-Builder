// src/components/canvas/RenderNode.tsx
import React from 'react';
import { UINode } from '../../types/builder';
import { parseStyles } from '../../utils/styleParser';
import { useBuilderStore } from '../../store/useBuilderStore';

export const RenderNode = ({ node }: { node: UINode }) => {
  const selectNode = useBuilderStore(s => s.selectNode);
  const selectedNodeId = useBuilderStore(s => s.selectedNodeId);
  const moveNode = useBuilderStore(s => s.moveNode);
  const dragOverId = useBuilderStore(s => s.dragOverId);
  const setDragOverId = useBuilderStore(s => s.setDragOverId);

  const isSelected = selectedNodeId === node.id;
  const isDragOver = dragOverId === node.id;

  const dndHandlers = {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.stopPropagation();
      e.dataTransfer.setData('nodeId', node.id);
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverId(node.id);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const draggedId = e.dataTransfer.getData('nodeId');
      if (draggedId) moveNode(draggedId, node.id);
      setDragOverId(null);
    },
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      selectNode(node.id);
    },
  };

  const outline = isDragOver
    ? '2px solid orange'
    : isSelected
    ? '2px solid blue'
    : 'none';

  if (node.type === "container") {
    return (
      <div
        {...dndHandlers}
        style={{
          ...parseStyles(node.props || {}),
          minHeight: '50px',
          border: '1px dashed #ccc',
          outline,
          outlineOffset: -2,
        }}
      >
        {node.children?.map((childNode) => (
          <RenderNode key={childNode.id} node={childNode} />
        ))}
      </div>
    );
  }

  if (node.type === "button") {
    return (
      <button
        {...dndHandlers}
        style={{
          ...parseStyles(node.props || {}),
          outline,
          outlineOffset: -2,
        }}
      >
        {node.props?.text ?? 'Buton'}
      </button>
    );
  }

  if(node.type === "text") {
    return (
      <span
        {...dndHandlers}
        style={{
          ...parseStyles(node.props || {}),
          outline,
          outlineOffset: -2,
        }}
      >
        {node.props?.text ?? 'Metin'}
      </span>  
    );
  }

  return null;
};