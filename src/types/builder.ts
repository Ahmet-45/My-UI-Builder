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
  h1: {
    tag: 'h1', acceptsChildren: false, selfClosing: false, defaultProps: 
    { text: 'Başlık 1', fontSize: 28}
  },
  h2: {
    tag: 'h1', acceptsChildren: false, selfClosing: false, defaultProps: 
    { text: 'Başlık 2', fontSize: 22}
  },
  h3: {
    tag: 'h1', acceptsChildren: false, selfClosing: false, defaultProps: 
    { text: 'Başlık 3', fontSize: 18}
  },
} as const;

export type NodeType = keyof typeof NODE_REGISTRY;

export interface NodeProps {
  backgroundColor?: string;
  width?: number;
  widthUnit?: 'px' | '%' | 'vw';
  height?: number;
  heightUnit?: 'px' | '%' | 'vh';
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
  textAlign?: 'left' | 'center' | 'right';
  overflowWrap?: 'normal' | 'break-word';
  wordBreak?: 'normal' | 'break-all';
}

export interface UINode {
  id: string;
  type: NodeType;
  props?: NodeProps;
  children?: UINode[];
}