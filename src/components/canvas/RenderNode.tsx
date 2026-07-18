// src/components/canvas/RenderNode.tsx
import React from 'react';
import { UINode } from '../../types/builder';
import { parseStyles } from '../../utils/styleParser';
import { useBuilderStore } from '../../store/useBuilderStore';

export const RenderNode = ({ node }: { node: UINode }) => {
  const selectNode = useBuilderStore((state) => state.selectNode);
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
  const moveNode = useBuilderStore(s => s.moveNode);
  const isSelected = selectedNodeId === node.id;
  const outlineStyle = isSelected ? {outline: '2px solid blue', outlineOffset: '-2px'} : {};
  
  if (node.type === "container"){
    return (
      <div
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData('nodeId', node.id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.stopPropagation();
        const draggedId = e.dataTransfer.getData('nodeId');
        if (draggedId) moveNode(draggedId, node.id);
      }}
      onClick = {(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }} 
      style={{...parseStyles(node.props || {}),
      minHeight: '50px',
      border: '1px dashed #ccc', ...outlineStyle}}>
        {node.children && node.children.map((childNode) => <RenderNode key={childNode.id} node={childNode} />)}
      </div>
    );
  }

  if(node.type === "button"){
    return (
      <button
        draggable
        onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.setData('nodeId', node.id);
        }}
        onClick = {(e) => {
            e.stopPropagation();
            selectNode(node.id);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const draggedId = e.dataTransfer.getData('nodeId');
          if (draggedId) moveNode(draggedId, node.id);
        }}
        style={{...parseStyles(node.props || {}), ...outlineStyle}}>
          Tikla
      </button>
    );
  }

  return null;
};