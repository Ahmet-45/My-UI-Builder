// src/types/builder.ts
export const NODE_REGISTRY = {
  container: { tag: 'div', acceptsChildren: true, selfClosing: false},
  button: { tag: 'button', acceptsChildren: false, selfClosing: false},
  text: { tag: 'span', acceptsChildren: false, selfClosing: false},
  input: { tag: 'input', acceptsChildren: false, selfClosing: true},
} as const;

export type NodeType = keyof typeof NODE_REGISTRY;

export interface NodeProps {
  backgroundColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  display?: 'flex' | 'block';
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  gap?: number;
  flexShrink?: number | string;
  overflow?: 'visible' | 'hidden' | 'auto' | 'scroll';
  text?: string;
  color?: string;
  fontSize?: number;
}

export interface UINode {
  id: string;
  type: NodeType;
  props?: NodeProps;
  children?: UINode[];
}