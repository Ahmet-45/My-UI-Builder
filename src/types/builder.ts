// src/types/builder.ts
export const NODE_REGISTRY = {
  container: { 
    tag: 'div', acceptsChildren: true, selfClosing: false, defaultProps: { width: 200, height: 100, backgroundColor: '#eeeeee'}, 
  },
  button: { 
    tag: 'button', acceptsChildren: false, selfClosing: false, defaultProps: { text: 'Buton', height: 40, backgroundColor: '#dddddd' }, 
  },
  text: { 
    tag: 'span', acceptsChildren: false, selfClosing: false, defaultProps: { text: 'Metin', width: 200, height: 40, fontSize: 16, backgroundColor: '#dddddd' },
  },
  input: { 
    tag: 'input', acceptsChildren: false, selfClosing: true, defaultProps: { text: 'Buraya yazin', height: 40 }, 
  },
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